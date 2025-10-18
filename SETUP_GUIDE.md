# MacLabs Contact Form Database & Notification Setup Guide

## Overview
Your contact form is now enhanced with multiple database storage options and notification channels. This guide will help you set up and configure all the available options.

## 🗄️ Database Options

### Option 1: Supabase Database (Recommended)
**Advantages:** Reliable, scalable, built-in admin interface, real-time capabilities

#### Setup Steps:
1. **Create Database Tables**
   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of `supabase_schema.sql`
   - Execute the SQL to create the tables

2. **Verify Tables**
   - Go to Table Editor in Supabase
   - You should see `contacts` and `bookings` tables
   - Check that the columns match your form fields

### Option 2: Google Sheets (Backup/Alternative)
**Advantages:** Easy to view, share with team, export data, no database knowledge required

#### Setup Steps:
1. **Create Google Sheet**
   - Create a new Google Sheet
   - Create two tabs: "Contacts" and "Bookings"
   - Add headers as specified in the `google-apps-script.js` file

2. **Set up Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Create a new project
   - Replace default code with contents from `google-apps-script.js`
   - Update the `SPREADSHEET_ID` and `ADMIN_EMAIL` variables
   - Save and deploy as web app

3. **Configure Environment Variable**
   - In your Supabase Edge Function settings, add:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## 📧 Notification Options

### Option 1: Email Notifications
Set up any of these email services:

#### Using Resend (Recommended)
```bash
ADMIN_EMAIL=your-email@example.com
EMAIL_WEBHOOK_URL=https://api.resend.com/emails
RESEND_API_KEY=your-resend-api-key
```

#### Using SendGrid
```bash
ADMIN_EMAIL=your-email@example.com
EMAIL_WEBHOOK_URL=https://api.sendgrid.com/v3/mail/send
SENDGRID_API_KEY=your-sendgrid-api-key
```

### Option 2: Discord Notifications
1. Create a Discord server or use existing one
2. Create a webhook in your desired channel
3. Add environment variable:
```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL
```

### Option 3: Slack Notifications
1. Create a Slack app or use incoming webhooks
2. Add environment variable:
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

### Option 4: Zapier Integration
1. Create a Zapier webhook trigger
2. Add environment variable:
```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
```

## 🚀 Deployment Steps

### 1. Update Supabase Environment Variables
In your Supabase project settings, add these environment variables:

```bash
# Required
ADMIN_EMAIL=your-email@example.com

# Optional - Choose the services you want to use
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
EMAIL_WEBHOOK_URL=https://api.resend.com/emails
```

### 2. Deploy Updated Edge Function
```bash
# If you're using Supabase CLI
supabase functions deploy make-server-a0d72807

# Or upload via Supabase dashboard
```

### 3. Test the Setup
1. Fill out your contact form
2. Check that data appears in:
   - Supabase database (Table Editor)
   - Google Sheets (if configured)
   - Your notification channels

## 📊 Admin Dashboard Access

### View Submissions via Supabase
- Go to your Supabase dashboard
- Navigate to Table Editor
- View `contacts` and `bookings` tables

### View Submissions via API
```javascript
// Get all contacts
fetch('https://YOUR_PROJECT.supabase.co/functions/v1/make-server-a0d72807/contacts', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})

// Get all bookings
fetch('https://YOUR_PROJECT.supabase.co/functions/v1/make-server-a0d72807/bookings', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
```

## 🔧 Customization Options

### Modify Form Fields
If you want to add/remove form fields:
1. Update the database schema in `supabase_schema.sql`
2. Update the server endpoint in `src/supabase/functions/server/index.tsx`
3. Update the frontend form in `src/pages/contact-page.tsx`
4. Update Google Sheets headers if using that option

### Add More Notification Channels
The system is designed to be extensible. You can add more notification services by:
1. Creating a new notification function
2. Adding it to the `sendNotifications` function
3. Adding the required environment variables

## 🛠️ Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify your Supabase URL and service role key
   - Check that tables exist and have correct schema

2. **Notifications Not Working**
   - Check environment variables are set correctly
   - Verify webhook URLs are active
   - Check Supabase function logs

3. **Google Sheets Not Updating**
   - Verify the Google Apps Script is deployed as web app
   - Check that the script has proper permissions
   - Ensure the spreadsheet ID is correct

### Testing Individual Components:

```bash
# Test database connection
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-a0d72807/contact \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Test health endpoint
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-a0d72807/health
```

## 📈 Analytics & Monitoring

### Built-in Analytics View
The system includes an admin dashboard stats view:
```sql
SELECT * FROM admin_dashboard_stats;
```

This provides:
- New contacts count
- Total contacts
- Scheduled bookings
- Today's submissions

### Setting Up Monitoring
Consider setting up:
- Supabase dashboard alerts
- Uptime monitoring for your endpoints
- Regular database backups

## 🔒 Security Considerations

1. **Environment Variables**: Never commit API keys to your repository
2. **Row Level Security**: The database tables have RLS enabled
3. **Rate Limiting**: Consider adding rate limiting to prevent spam
4. **Data Validation**: The server validates required fields

## 📞 Support

If you encounter issues:
1. Check the Supabase function logs
2. Verify all environment variables are set
3. Test individual components using the troubleshooting steps
4. Check that your webhook URLs are responding correctly
