// Google Sheets Integration for Contact Forms
// This is an alternative/backup option to Supabase

export class GoogleSheetsService {
  private static SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets'
  private static SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_Wg2EWYGw_R55MJL4HQFgZRxyGUCDuTF7FYBaYHrpex_IXRJcvYpsBEthJf1k-cJYXQ/exec'

  // Method 1: Using Google Apps Script Web App (Recommended for simplicity)
  static async sendToGoogleSheets(formData: any, type: 'contact' | 'booking') {
    try {
      const payload = {
        type,
        timestamp: new Date().toISOString(),
        ...formData
      }

      const response = await fetch(this.SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      console.log('Data sent to Google Sheets successfully')
      return { success: true }
    } catch (error) {
      console.error('Google Sheets error:', error)
      throw error
    }
  }

  // Method 2: Using Google Sheets API directly (requires API key and more setup)
  static async sendToSheetsAPI(formData: any, type: 'contact' | 'booking') {
    const apiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY')
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_ID')
    
    if (!apiKey || !spreadsheetId) {
      throw new Error('Google Sheets API key or spreadsheet ID not configured')
    }

    const sheetName = type === 'contact' ? 'Contacts' : 'Bookings'
    const range = `${sheetName}!A:Z`

    const values = type === 'contact' 
      ? [
          new Date().toISOString(),
          formData.name,
          formData.email,
          formData.phone || '',
          formData.company || '',
          formData.service || '',
          formData.budget || '',
          formData.message || '',
          'new'
        ]
      : [
          new Date().toISOString(),
          formData.name,
          formData.email,
          formData.phone || '',
          formData.company || '',
          formData.selectedDate,
          formData.selectedTime,
          formData.message || '',
          'scheduled'
        ]

    const response = await fetch(
      `${this.SHEETS_API_URL}/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [values]
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`)
    }

    return await response.json()
  }
}

// Email notification using simple webhook services
export class EmailNotificationService {
  // Using Zapier webhook (simple option)
  static async sendZapierNotification(data: any, type: 'contact' | 'booking') {
    const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_URL')
    if (!webhookUrl) return

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data })
      })
    } catch (error) {
      console.error('Zapier notification error:', error)
    }
  }

  // Using Make.com (formerly Integromat) webhook
  static async sendMakeNotification(data: any, type: 'contact' | 'booking') {
    const webhookUrl = Deno.env.get('MAKE_WEBHOOK_URL')
    if (!webhookUrl) return

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data })
      })
    } catch (error) {
      console.error('Make.com notification error:', error)
    }
  }

  // Using Discord webhook (for quick notifications)
  static async sendDiscordNotification(data: any, type: 'contact' | 'booking') {
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL')
    if (!webhookUrl) return

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
        { name: 'Date', value: data.selectedDate, inline: true },
        { name: 'Time', value: data.selectedTime, inline: true },
        { name: 'Message', value: data.message || 'No message', inline: false }
      )
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      })
    } catch (error) {
      console.error('Discord notification error:', error)
    }
  }

  // Using Slack webhook
  static async sendSlackNotification(data: any, type: 'contact' | 'booking') {
    const webhookUrl = Deno.env.get('SLACK_WEBHOOK_URL')
    if (!webhookUrl) return

    const message = type === 'contact' 
      ? `🆕 *New Contact Form Submission*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone || 'Not provided'}\n*Company:* ${data.company || 'Not provided'}\n*Service:* ${data.service || 'Not specified'}\n*Budget:* ${data.budget || 'Not specified'}\n*Message:* ${data.message || 'No message'}`
      : `📅 *New Strategy Call Booking*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone || 'Not provided'}\n*Company:* ${data.company || 'Not provided'}\n*Date:* ${data.selectedDate}\n*Time:* ${data.selectedTime}\n*Message:* ${data.message || 'No message'}`

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      })
    } catch (error) {
      console.error('Slack notification error:', error)
    }
  }
}
