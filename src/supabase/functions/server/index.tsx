import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors())
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Google Sheets backup integration
async function sendToGoogleSheets(formData: any, type: 'contact' | 'booking') {
  const googleScriptUrl = Deno.env.get('GOOGLE_SCRIPT_URL')
  if (!googleScriptUrl) return

  try {
    const payload = {
      type,
      timestamp: new Date().toISOString(),
      ...formData
    }

    await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    console.log(`Data sent to Google Sheets: ${type}`)
  } catch (error) {
    console.error('Google Sheets backup error:', error)
  }
}

// Multi-channel notification system
async function sendNotifications(data: any, type: 'contact' | 'booking') {
  const notifications = []

  // Email notification
  notifications.push(sendEmailNotification(data, type))

  // Discord notification
  const discordUrl = Deno.env.get('DISCORD_WEBHOOK_URL')
  if (discordUrl) {
    notifications.push(sendDiscordNotification(data, type, discordUrl))
  }

  // Slack notification
  const slackUrl = Deno.env.get('SLACK_WEBHOOK_URL')
  if (slackUrl) {
    notifications.push(sendSlackNotification(data, type, slackUrl))
  }

  // Zapier webhook
  const zapierUrl = Deno.env.get('ZAPIER_WEBHOOK_URL')
  if (zapierUrl) {
    notifications.push(sendZapierNotification(data, type, zapierUrl))
  }

  // Wait for all notifications to complete (don't fail if some fail)
  await Promise.allSettled(notifications)
}

// Email notification functions
async function sendEmailNotification(data: any, type: 'contact' | 'booking') {
  const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'admin@maclabs.com'
  
  const emailContent = type === 'contact' 
    ? `
    🆕 New Contact Form Submission
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone || 'Not provided'}
    Company: ${data.company || 'Not provided'}
    Service: ${data.service || 'Not specified'}
    Budget: ${data.budget || 'Not specified'}
    
    Message:
    ${data.message || 'No message provided'}
    
    Submitted at: ${data.created_at || new Date().toISOString()}
    `
    : `
    📅 New Strategy Call Booking
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone || 'Not provided'}
    Company: ${data.company || 'Not provided'}
    
    Scheduled for: ${data.selected_date} at ${data.selected_time}
    
    Message:
    ${data.message || 'No message provided'}
    
    Booked at: ${data.created_at || new Date().toISOString()}
    `
  
  console.log(`📧 ${type === 'contact' ? 'Contact' : 'Booking'} Notification:`, emailContent)
  
  // Send via email webhook service if configured
  try {
    const emailServiceUrl = Deno.env.get('EMAIL_WEBHOOK_URL')
    if (emailServiceUrl) {
      await fetch(emailServiceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: adminEmail,
          subject: type === 'contact' 
            ? `New Contact: ${data.name}` 
            : `New Booking: ${data.name} - ${data.selected_date}`,
          text: emailContent,
          type
        })
      })
    }
  } catch (error) {
    console.error('Email service error:', error)
  }
}

async function sendDiscordNotification(data: any, type: 'contact' | 'booking', webhookUrl: string) {
  const embed = {
    title: type === 'contact' ? '📧 New Contact Form' : '📅 New Booking',
    color: type === 'contact' ? 0x00ff00 : 0x0099ff,
    fields: [
      { name: 'Name', value: data.name, inline: true },
      { name: 'Email', value: data.email, inline: true },
      { name: 'Phone', value: data.phone || 'Not provided', inline: true },
      { name: 'Company', value: data.company || 'Not provided', inline: true },
    ],
    timestamp: new Date().toISOString()
  }

  if (type === 'contact') {
    embed.fields.push(
      { name: 'Service', value: data.service || 'Not specified', inline: true },
      { name: 'Budget', value: data.budget || 'Not specified', inline: true },
      { name: 'Message', value: data.message || 'No message', inline: false }
    )
  } else {
    embed.fields.push(
      { name: 'Date', value: data.selected_date, inline: true },
      { name: 'Time', value: data.selected_time, inline: true },
      { name: 'Message', value: data.message || 'No message', inline: false }
    )
  }

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  })
}

async function sendSlackNotification(data: any, type: 'contact' | 'booking', webhookUrl: string) {
  const message = type === 'contact' 
    ? `🆕 *New Contact Form Submission*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone || 'Not provided'}\n*Company:* ${data.company || 'Not provided'}\n*Service:* ${data.service || 'Not specified'}\n*Budget:* ${data.budget || 'Not specified'}\n*Message:* ${data.message || 'No message'}`
    : `📅 *New Strategy Call Booking*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone || 'Not provided'}\n*Company:* ${data.company || 'Not provided'}\n*Date:* ${data.selected_date}\n*Time:* ${data.selected_time}\n*Message:* ${data.message || 'No message'}`

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
  })
}

async function sendZapierNotification(data: any, type: 'contact' | 'booking', webhookUrl: string) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, ...data })
  })
}

// Contact form submission endpoint
app.post('/make-server-a0d72807/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, company, service, budget, message } = body

    // Validate required fields
    if (!name || !email) {
      return c.json({ error: 'Name and email are required' }, 400)
    }

    // Store contact submission in Supabase database
    const { data: contactData, error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || '',
          company: company || '',
          service: service || '',
          budget: budget || '',
          message: message || '',
          status: 'new',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return c.json({ 
        error: 'Failed to save contact form',
        details: dbError.message 
      }, 500)
    }

    console.log(`New contact submission: ${contactData.id} from ${email}`)

    // Send notifications and backup to Google Sheets
    try {
      await Promise.allSettled([
        sendNotifications(contactData, 'contact'),
        sendToGoogleSheets(contactData, 'contact')
      ])
    } catch (notificationError) {
      console.error('Notification error:', notificationError)
      // Don't fail the request if notifications fail
    }

    return c.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contactId: contactData.id
    })

  } catch (error) {
    console.error(`Contact form submission error: ${error}`)
    return c.json({ 
      error: 'Failed to submit contact form',
      details: error.message 
    }, 500)
  }
})

// Booking submission endpoint
app.post('/make-server-a0d72807/booking', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, company, message, selectedDate, selectedTime } = body

    // Validate required fields
    if (!name || !email || !selectedDate || !selectedTime) {
      return c.json({ error: 'Name, email, date, and time are required' }, 400)
    }

    // Store booking in Supabase database
    const { data: bookingData, error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          phone: phone || '',
          company: company || '',
          message: message || '',
          selected_date: selectedDate,
          selected_time: selectedTime,
          status: 'scheduled',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return c.json({ 
        error: 'Failed to save booking',
        details: dbError.message 
      }, 500)
    }

    console.log(`New booking scheduled: ${bookingData.id} for ${selectedDate} at ${selectedTime}`)

    // Send notifications and backup to Google Sheets
    try {
      await Promise.allSettled([
        sendNotifications(bookingData, 'booking'),
        sendToGoogleSheets(bookingData, 'booking')
      ])
    } catch (notificationError) {
      console.error('Notification error:', notificationError)
      // Don't fail the request if notifications fail
    }

    return c.json({ 
      success: true, 
      message: 'Strategy call booked successfully',
      bookingId: bookingData.id,
      scheduledFor: `${selectedDate} at ${selectedTime}`
    })

  } catch (error) {
    console.error(`Booking submission error: ${error}`)
    return c.json({ 
      error: 'Failed to book strategy call',
      details: error.message 
    }, 500)
  }
})

// Get all contacts (admin endpoint)
app.get('/make-server-a0d72807/contacts', async (c) => {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }

    return c.json({ 
      success: true, 
      contacts: contacts || []
    })
  } catch (error) {
    console.error(`Error fetching contacts: ${error}`)
    return c.json({ 
      error: 'Failed to fetch contacts',
      details: error.message 
    }, 500)
  }
})

// Get all bookings (admin endpoint)
app.get('/make-server-a0d72807/bookings', async (c) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }

    return c.json({ 
      success: true, 
      bookings: bookings || []
    })
  } catch (error) {
    console.error(`Error fetching bookings: ${error}`)
    return c.json({ 
      error: 'Failed to fetch bookings',
      details: error.message 
    }, 500)
  }
})

// Health check endpoint
app.get('/make-server-a0d72807/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'MacLabs Marketing Website API'
  })
})

console.log('MacLabs server starting...')
Deno.serve(app.fetch)