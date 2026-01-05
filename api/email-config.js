// Centralized email configuration for Vercel deployment
import nodemailer from 'nodemailer';

// Create email transporter with enhanced error logging
export function createTransporter() {
  // Log environment variables availability (not their values)
  console.log('Email config check:', {
    host: process.env.EMAIL_HOST ? 'defined' : 'undefined',
    port: process.env.EMAIL_PORT ? 'defined' : 'undefined',
    user: process.env.EMAIL_USER ? 'defined' : 'undefined',
    pass: process.env.EMAIL_PASS ? 'defined' : 'undefined',
    from: process.env.EMAIL_FROM ? 'defined' : 'undefined',
    bcc: process.env.EMAIL_BCC ? 'defined' : 'undefined'
  });

  // Create transporter with improved error handling
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add these options for better reliability on Vercel
    pool: true,
    maxConnections: 1,
    maxMessages: 10,
    // Increase timeouts for Vercel serverless functions
    connectionTimeout: 10000,
    socketTimeout: 20000,
    // Debug mode for troubleshooting
    debug: true
  });

  // Verify transporter configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.error('SMTP verification failed:', error);
    } else {
      console.log('SMTP server is ready to send messages');
    }
  });

  return transporter;
}

// Helper function to send email with enhanced error handling
export async function sendEmail(mailOptions) {
  try {
    const transporter = createTransporter();
    console.log('Sending email to:', mailOptions.to);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    // Close the connection
    transporter.close();
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Detailed error logging
    if (error.code) console.error('Error code:', error.code);
    if (error.command) console.error('Error command:', error.command);
    if (error.response) console.error('Error response:', error.response);
    
    return { 
      success: false, 
      error: error.message,
      errorDetails: {
        code: error.code,
        command: error.command,
        response: error.response
      }
    };
  }
}
