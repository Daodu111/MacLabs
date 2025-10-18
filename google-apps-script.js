/**
 * Google Apps Script for MacLabs Contact Form Integration
 * 
 * Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet with two tabs: "Contacts" and "Bookings"
 * 5. Set up the headers in your Google Sheet:
 *    
 *    Contacts sheet headers (Row 1):
 *    Timestamp | Name | Email | Phone | Company | Service | Budget | Message | Status
 *    
 *    Bookings sheet headers (Row 1):
 *    Timestamp | Name | Email | Phone | Company | Date | Time | Message | Status
 * 
 * 6. Replace 'YOUR_SPREADSHEET_ID' with your actual spreadsheet ID
 * 7. Deploy as web app with execute permissions for "Anyone"
 * 8. Copy the web app URL and use it in your integration
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID
const ADMIN_EMAIL = 'your-email@example.com'; // Replace with your email

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const type = data.type;
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    if (type === 'contact') {
      handleContactSubmission(ss, data);
    } else if (type === 'booking') {
      handleBookingSubmission(ss, data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleContactSubmission(ss, data) {
  const sheet = ss.getSheetByName('Contacts');
  
  if (!sheet) {
    throw new Error('Contacts sheet not found');
  }
  
  // Prepare the row data
  const rowData = [
    new Date(), // Timestamp
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.service || '',
    data.budget || '',
    data.message || '',
    'New'
  ];
  
  // Append the data to the sheet
  sheet.appendRow(rowData);
  
  // Send email notification
  sendEmailNotification('contact', data);
  
  console.log('Contact form submission saved:', data.email);
}

function handleBookingSubmission(ss, data) {
  const sheet = ss.getSheetByName('Bookings');
  
  if (!sheet) {
    throw new Error('Bookings sheet not found');
  }
  
  // Prepare the row data
  const rowData = [
    new Date(), // Timestamp
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.selectedDate || '',
    data.selectedTime || '',
    data.message || '',
    'Scheduled'
  ];
  
  // Append the data to the sheet
  sheet.appendRow(rowData);
  
  // Send email notification
  sendEmailNotification('booking', data);
  
  console.log('Booking submission saved:', data.email);
}

function sendEmailNotification(type, data) {
  try {
    let subject, body;
    
    if (type === 'contact') {
      subject = `New Contact Form: ${data.name}`;
      body = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Service: ${data.service || 'Not specified'}
Budget: ${data.budget || 'Not specified'}

Message:
${data.message || 'No message provided'}

Submitted at: ${new Date().toLocaleString()}

---
This is an automated notification from your MacLabs website contact form.
      `;
    } else {
      subject = `New Booking: ${data.name} - ${data.selectedDate}`;
      body = `
New Strategy Call Booking

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

Scheduled for: ${data.selectedDate} at ${data.selectedTime}

Message:
${data.message || 'No message provided'}

Booked at: ${new Date().toLocaleString()}

---
This is an automated notification from your MacLabs website booking system.
      `;
    }
    
    // Send the email
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });
    
    console.log('Email notification sent for:', type);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('MacLabs Contact Form Handler is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function - you can run this to test the setup
function testSetup() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet opened successfully:', ss.getName());
    
    const contactsSheet = ss.getSheetByName('Contacts');
    const bookingsSheet = ss.getSheetByName('Bookings');
    
    if (!contactsSheet) {
      console.log('Creating Contacts sheet...');
      const newContactsSheet = ss.insertSheet('Contacts');
      newContactsSheet.getRange('A1:I1').setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Message', 'Status']]);
    }
    
    if (!bookingsSheet) {
      console.log('Creating Bookings sheet...');
      const newBookingsSheet = ss.insertSheet('Bookings');
      newBookingsSheet.getRange('A1:I1').setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Date', 'Time', 'Message', 'Status']]);
    }
    
    console.log('Setup test completed successfully!');
    
  } catch (error) {
    console.error('Setup test failed:', error);
  }
}
