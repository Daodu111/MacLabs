# Firebase Cloud Functions Setup Guide

## Step-by-Step Instructions to Set Up Email Notifications

### Prerequisites
1. **Firebase CLI installed**: If not, install it:
   ```bash
   npm install -g firebase-tools
   ```
2. **Firebase project**: Your project `maclabs-blog` is already configured
3. **Blaze Plan**: Firebase Functions require the Blaze (pay-as-you-go) plan for external HTTP requests

---

## Step 1: Install Function Dependencies

```bash
cd functions
npm install
```

---

## Step 2: Configure Firebase Functions Secrets

You need to set 3 configuration values. Run these commands from the **root directory** of your project:

```bash
# Set Resend API Key (you already have this)
firebase functions:config:set resend.api_key="re_THWxTP6j_JK64Pc6xcsFoyrMD3bYxfLC7"

# Set FROM email (the email that will SEND notifications)
# ⚠️ IMPORTANT: This must be a verified email in your Resend account
# Options:
# - Use a domain email: notifications@yourdomain.com (if domain verified in Resend)
# - Or use Resend's default: onboarding@resend.dev (for testing only)
firebase functions:config:set email.from="notifications@maclabsmarketing.com"

# Set TO email (where notifications will be RECEIVED)
firebase functions:config:set email.to="sam.daodu@maclabsmarketing.com"
```

**About FROM_EMAIL:**
- Must be verified in your Resend dashboard
- If using a custom domain, verify the domain in Resend first
- For testing, you can use `onboarding@resend.dev` (Resend's test email)

**To verify your config:**
```bash
firebase functions:config:get
```

---

## Step 3: Verify Resend Email Setup

1. Go to [Resend Dashboard](https://resend.com)
2. Log in with your account
3. **Verify your FROM email:**
   - Go to "Domains" → Add and verify your domain, OR
   - Use a verified email address (check "API Keys" section)

---

## Step 4: Build the Functions

```bash
cd functions
npm run build
```

This compiles TypeScript to JavaScript in the `lib/` folder.

---

## Step 5: Deploy Functions to Firebase

From the **root directory**:

```bash
firebase deploy --only functions
```

Or from functions directory:
```bash
cd functions
npm run deploy
```

**First-time deployment:**
- You may need to enable Cloud Functions API
- You may need to upgrade to Blaze plan if not already done

---

## Step 6: Update Firestore Rules

The rules file is already updated, but deploy it:

```bash
firebase deploy --only firestore:rules
```

---

## Step 7: Test the Setup

1. Go to your website's contact page
2. Fill out and submit the contact form
3. Check:
   - **Email inbox**: You should receive an email at `sam.daodu@maclabsmarketing.com`
   - **Firebase Console**: Go to Functions → Logs to see function execution
   - **Firestore Console**: Check `contacts` collection for the new submission

---

## Troubleshooting

### ❌ "RESEND_API_KEY not configured"
**Fix**: Run `firebase functions:config:set resend.api_key="YOUR_KEY"` again

### ❌ "Email not verified" error from Resend
**Fix**: 
1. Go to Resend dashboard
2. Verify your domain OR use a verified email
3. Update FROM_EMAIL config

### ❌ "Permission denied" when submitting form
**Fix**: Deploy Firestore rules:
```bash
firebase deploy --only firestore:rules
```

### ❌ Functions won't deploy
**Fix**: 
- Check you're on Blaze plan
- Enable Cloud Functions API in Firebase Console
- Run `firebase login` to authenticate

### ❌ Build errors
**Fix**:
```bash
cd functions
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Viewing Logs

```bash
# View all function logs
firebase functions:log

# View logs for specific function
firebase functions:log --only onContactCreated
```

---

## Updating Configuration

To update any config value:
```bash
firebase functions:config:set resend.api_key="NEW_KEY"
firebase deploy --only functions
```

---

## What Gets Stored

When a contact form is submitted:
- **Firestore**: Document created in `contacts` collection with all form data
- **Email**: Sent to `sam.daodu@maclabsmarketing.com` with form details
- **Tracking**: Document updated with `emailSent: true/false` and `emailId`

---

## Quick Reference Commands

```bash
# Install dependencies
cd functions && npm install

# Build
npm run build

# Deploy
firebase deploy --only functions

# View logs
firebase functions:log

# Get current config
firebase functions:config:get

# Set config
firebase functions:config:set resend.api_key="YOUR_KEY"
```

---

## Need Help?

- Check Firebase Console → Functions → Logs
- Check Resend dashboard → Logs
- Verify all config values are set correctly

