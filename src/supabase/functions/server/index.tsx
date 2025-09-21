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

// Contact form submission endpoint
app.post('/make-server-a0d72807/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, company, service, budget, message } = body

    // Validate required fields
    if (!name || !email) {
      return c.json({ error: 'Name and email are required' }, 400)
    }

    // Store contact submission in KV store
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const contactData = {
      id: contactId,
      name,
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      budget: budget || '',
      message: message || '',
      timestamp: new Date().toISOString(),
      status: 'new'
    }

    await kv.set(contactId, contactData)

    // Also store in a general contacts list for easy retrieval
    const contactsList = await kv.get('contacts_list') || []
    contactsList.push(contactId)
    await kv.set('contacts_list', contactsList)

    console.log(`New contact submission: ${contactId} from ${email}`)

    return c.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contactId 
    })

  } catch (error) {
    console.log(`Contact form submission error: ${error}`)
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

    // Store booking in KV store
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const bookingData = {
      id: bookingId,
      name,
      email,
      phone: phone || '',
      company: company || '',
      message: message || '',
      selectedDate,
      selectedTime,
      timestamp: new Date().toISOString(),
      status: 'scheduled'
    }

    await kv.set(bookingId, bookingData)

    // Store in bookings list
    const bookingsList = await kv.get('bookings_list') || []
    bookingsList.push(bookingId)
    await kv.set('bookings_list', bookingsList)

    console.log(`New booking scheduled: ${bookingId} for ${selectedDate} at ${selectedTime}`)

    return c.json({ 
      success: true, 
      message: 'Strategy call booked successfully',
      bookingId,
      scheduledFor: `${selectedDate} at ${selectedTime}`
    })

  } catch (error) {
    console.log(`Booking submission error: ${error}`)
    return c.json({ 
      error: 'Failed to book strategy call',
      details: error.message 
    }, 500)
  }
})

// Get all contacts (admin endpoint)
app.get('/make-server-a0d72807/contacts', async (c) => {
  try {
    const contactsList = await kv.get('contacts_list') || []
    const contacts = await kv.mget(contactsList)
    
    return c.json({ 
      success: true, 
      contacts: contacts.filter(contact => contact !== null)
    })
  } catch (error) {
    console.log(`Error fetching contacts: ${error}`)
    return c.json({ 
      error: 'Failed to fetch contacts',
      details: error.message 
    }, 500)
  }
})

// Get all bookings (admin endpoint)
app.get('/make-server-a0d72807/bookings', async (c) => {
  try {
    const bookingsList = await kv.get('bookings_list') || []
    const bookings = await kv.mget(bookingsList)
    
    return c.json({ 
      success: true, 
      bookings: bookings.filter(booking => booking !== null)
    })
  } catch (error) {
    console.log(`Error fetching bookings: ${error}`)
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