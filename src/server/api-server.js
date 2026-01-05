// API Server for Hotel Sai Vijay
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Guest email template
const guestEmailTemplate = (data) => {
  // Same template as before
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="en">
<!-- Email template content -->
<!-- ... -->
</html>`;
};

// Admin email template
const adminEmailTemplate = (data) => {
  // Same template as before
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `<!DOCTYPE html>
<html lang="en">
<!-- Email template content -->
<!-- ... -->
</html>`;
};

// Function to send email to guest
const sendGuestEmail = async (formData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: formData.email,
      subject: 'Thank You for Contacting Hotel Sai Vijay',
      html: guestEmailTemplate(formData),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending guest email:', error);
    return false;
  }
};

// Function to send email to admin
const sendAdminEmail = async (formData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `New Enquiry: ${formData.enquiryType} from ${formData.name}`,
      html: adminEmailTemplate(formData),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    return false;
  }
};

// Function to send form data to Google Sheets
const sendToGoogleSheet = async (formData) => {
  try {
    // Use environment variable - with fallback to the Vite one if needed
    const deployUrl = process.env.GOOGLE_SHEET_DEPLOY_URL || process.env.VITE_WEB_APP_SHEET_URL;
    
    if (!deployUrl) {
      console.error('Google Sheet deploy URL not found in environment variables');
      return false;
    }
    
    console.log('Using Google Sheet URL:', deployUrl);
    
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
      mobile: formData.mobile || formData.contactNo,
      enquiryType: formData.enquiryType || formData.formType,
      eventType: formData.eventType || 'N/A',
      message: formData.message || 'N/A',
      formType: formData.formType || 'contact'
    };
    
    // Send data to Google Sheets
    const response = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Using text/plain to avoid CORS preflight issues
      },
      body: JSON.stringify(sheetData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send data to Google Sheets: ${response.statusText}`);
    }
    
    const responseData = await response.json();
    console.log('Google Sheet response:', responseData);
    
    return true;
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    return false;
  }
};

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
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
    
    // Mark this as a contact form submission
    formData.formType = 'contact';
    
    // Submit the form
    const guestEmailSent = await sendGuestEmail(formData);
    const adminEmailSent = await sendAdminEmail(formData);
    
    // Always try to send to Google Sheet using the environment variable
    const sheetDataSent = await sendToGoogleSheet(formData);
    
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
      if (!sheetDataSent) message += ' Your information may not be recorded in our system.';
      
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
});

// Test endpoint for Google Sheet integration
app.get('/api/test-sheet', async (req, res) => {
  try {
    const testData = {
      name: "Test User",
      email: "test@example.com",
      mobile: "9876543210",
      enquiryType: "Test",
      message: "This is a test from the API server",
      formType: "test"
    };
    
    const result = await sendToGoogleSheet(testData);
    
    res.json({
      success: result,
      message: result ? 'Test data sent to Google Sheet' : 'Failed to send test data'
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({
      success: false,
      message: `Test error: ${error.message}`
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email service: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
  console.log(`Google Sheets URL: ${process.env.GOOGLE_SHEET_DEPLOY_URL || process.env.VITE_WEB_APP_SHEET_URL || 'Not configured'}`);
});
