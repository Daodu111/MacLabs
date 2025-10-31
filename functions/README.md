# MacLabs Marketing - Firebase Cloud Functions

This directory contains Firebase Cloud Functions for handling contact form submissions and sending email notifications.

## Setup Instructions

### 1. Install Dependencies
```bash
cd functions
npm install
```

### 2. Configure Firebase Functions Secrets

Set the following configuration values using Firebase CLI:

```bash
# Set Resend API Key
firebase functions:config:set resend.api_key="re_THWxTP6j_JK64Pc6xcsFoyrMD3bYxfLC7"

# Set FROM email (the email address that will send notifications)
# Replace with your verified Resend email address
firebase functions:config:set email.from="notifications@yourdomain.com"

# Set TO email (where notifications are sent)
firebase functions:config:set email.to="sam.daodu@maclabsmarketing.com"
```

**Note:** For FROM_EMAIL, you need to:
1. Verify your domain in Resend dashboard
2. Or use a verified email address from Resend
3. Common format: `notifications@yourdomain.com` or `noreply@yourdomain.com`

### 3. Build the Functions
```bash
npm run build
```

### 4. Deploy Functions
```bash
# From the root directory
firebase deploy --only functions

# Or from functions directory
npm run deploy
```

### 5. Verify Deployment
After deployment, test by submitting the contact form on your website. Check:
- Firebase Console → Functions → Logs
- Your email inbox (sam.daodu@maclabsmarketing.com)

## Function Details

### `onContactCreated`
- **Trigger:** Firestore document creation in `contacts` collection
- **Action:** Sends email notification using Resend API
- **Updates:** Adds `emailSent`, `emailSentAt`, and `emailId` fields to the contact document

## Troubleshooting

1. **Email not sending?**
   - Check Firebase Functions logs: `firebase functions:log`
   - Verify Resend API key is correct
   - Ensure FROM_EMAIL is verified in Resend dashboard

2. **Configuration errors?**
   - Run `firebase functions:config:get` to verify your config
   - Make sure all three config values are set

3. **Build errors?**
   - Run `npm install` in the functions directory
   - Check TypeScript version compatibility

## Local Testing

```bash
# Start Firebase emulators
firebase emulators:start --only functions,firestore

# Submit test data to Firestore to trigger function
```

## Required Firebase Plan

Firebase Cloud Functions requires the **Blaze Plan** (pay-as-you-go) because it needs to make external HTTP requests (to Resend API). The free Spark plan doesn't allow external requests.

