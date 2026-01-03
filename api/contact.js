const nodemailer = require('nodemailer');


// Vercel Node.js 18+ has native fetch

// Create email transporter
let _transporter = null;
function getTransporter() { if (!_transporter) { _transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
      },
    });
  }
  return _transporter;
}

// Guest email template
const guestEmailTemplate = (data) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Hotel Sai Vijay</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #f0f0f0;
    }
    .logo {
      max-width: 180px;
      height: auto;
    }
    .content {
      padding: 20px 0;
    }
    h1 {
      color: #1a365d;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .details {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
    .details p {
      margin: 8px 0;
    }
    .details strong {
      color: #1a365d;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
      font-size: 14px;
      color: #666;
    }
    .social-links {
      margin: 15px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      text-decoration: none;
    }
    .social-icon {
      width: 32px;
      height: 32px;
    }
    .contact-info {
      margin: 15px 0;
      font-size: 14px;
      color: #555;
    }
    .contact-info p {
      margin: 5px 0;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #1a365d;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.ibb.co/Qp1SXBt/logo.png" alt="Hotel Sai Vijay Logo" class="logo">
    </div>
    
    <div class="content">
      <h1>Thank You for Contacting Us!</h1>
      
      <p>Dear ${data.name},</p>
      
      <p>Thank you for reaching out to Hotel Sai Vijay. We have received your enquiry and our team will get back to you within 24 hours.</p>
      
      <div class="details">
        <p><strong>Date:</strong> ${currentDate}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.mobile}</p>
        <p><strong>Enquiry Type:</strong> ${data.enquiryType}</p>
        ${data.eventType ? `<p><strong>Event Type:</strong> ${data.eventType}</p>` : ''}
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      </div>
      
      <p>If you have any urgent queries, please feel free to contact us directly:</p>
      
      <div class="contact-info">
        <p>ðŸ“ž <strong>Phone:</strong> +91 91300 70701</p>
        <p>ðŸ“§ <strong>Email:</strong> saivijaynashik@gmail.com</p>
        <p>ðŸ“ <strong>Address:</strong> Office, Ground Floor, Shree Hari Plaza, Abhang Nagar, New Adgaon Naka, Panchavati, Nashik, Maharashtra 422003</p>
      </div>
      
      <div style="text-align: center;">
        <a href="https://hotelsaivijay.com" class="cta-button">Visit Our Website</a>
      </div>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="https://facebook.com/hotelsaivijay"><img src="https://i.ibb.co/NyBWZNb/facebook.png" alt="Facebook" class="social-icon"></a>
        <a href="https://instagram.com/hotelsaivijay"><img src="https://i.ibb.co/zrXfL1s/instagram.png" alt="Instagram" class="social-icon"></a>
        <a href="https://wa.me/919130070701"><img src="https://i.ibb.co/Lkn7rkG/whatsapp.png" alt="WhatsApp" class="social-icon"></a>
      </div>
      
      <p>&copy; ${new Date().getFullYear()} Hotel Sai Vijay. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Admin email template
const adminEmailTemplate = (data) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enquiry from Website</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1a365d;
      color: white;
      padding: 15px 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    h1 {
      margin: 0;
      font-size: 22px;
    }
    .alert-icon {
      font-size: 24px;
      margin-right: 10px;
    }
    .enquiry-details {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #1a365d;
    }
    .enquiry-details p {
      margin: 8px 0;
    }
    .enquiry-details strong {
      color: #1a365d;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
      font-size: 14px;
      color: #666;
    }
    .action-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #1a365d;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 10px 5px;
    }
    .priority-tag {
      display: inline-block;
      padding: 4px 8px;
      background-color: #ff6b6b;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1><span class="alert-icon">ðŸ””</span> New Enquiry Received</h1>
    </div>
    
    <div class="content">
      <p>A new enquiry has been submitted through the website contact form.</p>
      
      <div class="enquiry-details">
        <p><strong>Date & Time:</strong> ${currentDate}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.mobile}</p>
        <p><strong>Enquiry Type:</strong> ${data.enquiryType} ${data.enquiryType === 'Banquet' ? '<span class="priority-tag">PRIORITY</span>' : ''}</p>
        ${data.eventType ? `<p><strong>Event Type:</strong> ${data.eventType}</p>` : ''}
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      </div>
      
      <div style="text-align: center;">
        <a href="tel:${data.mobile}" class="action-button">Call Customer</a>
        <a href="https://wa.me/${data.mobile.replace(/[^0-9]/g, '')}" class="action-button" style="background-color: #25D366;">WhatsApp</a>
        <a href="mailto:${data.email}" class="action-button" style="background-color: #4285F4;">Reply by Email</a>
      </div>
      
      <p style="margin-top: 20px;"><strong>Note:</strong> Please respond to this enquiry within 24 hours for optimal customer satisfaction.</p>
    </div>
    
    <div class="footer">
      <p>This is an automated notification from your website contact form.</p>
      <p>&copy; ${new Date().getFullYear()} Hotel Sai Vijay</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Send email to guest
const sendGuestEmail = async (formData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: formData.email,
      subject: 'Thank You for Contacting Hotel Sai Vijay',
      html: guestEmailTemplate(formData),
    };

    await getTransporter().sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending guest email:', error);
    return false;
  }
};

// Send email to admin
const sendAdminEmail = async (formData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `New Enquiry: ${formData.enquiryType} from ${formData.name}`,
      html: adminEmailTemplate(formData),
    };

    await getTransporter().sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    return false;
  }
};

// Function to send form data to Google Sheets
const sendToGoogleSheet = async (formData) => {
  try {
    const deployUrl = process.env.GOOGLE_SHEET_DEPLOY_URL;
    
    if (!deployUrl) {
      console.error('Google Sheet deploy URL not found in environment variables');
      return false;
    }
    
    // Format date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: `${formattedDate} ${formattedTime}`,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      enquiryType: formData.enquiryType,
      eventType: formData.eventType || 'N/A',
      message: formData.message || 'N/A'
    };
    
    // Send data to Google Sheets
    const response = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send data to Google Sheets: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    return false;
  }
};

// API endpoint handler
module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'enquiryType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Additional validation for Banquet enquiry
    if (formData.enquiryType === 'Banquet' && !formData.eventType) {
      return res.status(400).json({
        success: false,
        message: 'Event type is required for Banquet enquiries'
      });
    }
    
    // Submit the form
    const guestEmailSent = await sendGuestEmail(formData);
    const adminEmailSent = await sendAdminEmail(formData);
    const sheetDataSent = process.env.GOOGLE_SHEET_DEPLOY_URL ? await sendToGoogleSheet(formData) : true;
    
    // Check if all operations were successful
    if (guestEmailSent && adminEmailSent && sheetDataSent) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!'
      });
    } else {
      // Partial success
      let message = 'Your message was received, but there were some issues with our notification system.';
      if (!guestEmailSent) message += ' We could not send you a confirmation email.';
      if (!adminEmailSent) message += ' Our team may experience a delay in responding.';
      
      return res.status(200).json({
        success: true,
        message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}



