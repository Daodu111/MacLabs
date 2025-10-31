import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  status?: string;
  createdAt?: admin.firestore.Timestamp;
}

/**
 * Sends email notification when a new contact form is submitted
 * Uses Resend API to send emails
 */
export const onContactCreated = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const contactData = snap.data() as ContactData;
    const contactId = context.params.contactId;

    // Get configuration from environment variables (set via Firebase Functions config)
    const resendApiKey = functions.config().resend?.api_key;
    const fromEmail = functions.config().email?.from || 'noreply@maclabsmarketing.com';
    const toEmail = functions.config().email?.to || 'sam.daodu@maclabsmarketing.com';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured. Please set it using: firebase functions:config:set resend.api_key="YOUR_KEY"');
      return null;
    }

    try {
      // Format email content
      const emailSubject = `New Contact Form Submission: ${contactData.name}`;
      
      const emailBody = `
🆕 New Contact Form Submission

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${contactData.name}
📧 Email: ${contactData.email}
📞 Phone: ${contactData.phone || 'Not provided'}
🏢 Company: ${contactData.company || 'Not provided'}
💼 Service Interest: ${contactData.service || 'Not specified'}
💰 Budget Range: ${contactData.budget || 'Not specified'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:
${contactData.message || 'No message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Submitted: ${contactData.createdAt?.toDate().toLocaleString() || new Date().toLocaleString()}
🆔 Contact ID: ${contactId}

---
This is an automated notification from MacLabs Marketing website.
`;

      // Send email via Resend API
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: emailSubject,
          text: emailBody,
          reply_to: contactData.email // Allow replying directly to the contact
        })
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
      }

      const result = await resendResponse.json();
      console.log(`✅ Email sent successfully to ${toEmail} for contact ${contactId}. Resend ID: ${result.id}`);
      
      // Optionally update the contact document with email sent status
      await snap.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp(),
        emailId: result.id
      });

      return result;
    } catch (error: any) {
      console.error(`❌ Error sending email for contact ${contactId}:`, error);
      
      // Log error but don't fail the function
      await snap.ref.update({
        emailSent: false,
        emailError: error.message,
        emailErrorAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return null;
    }
  });

