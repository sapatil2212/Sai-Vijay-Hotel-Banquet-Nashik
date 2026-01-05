import { sendEmail } from './email-config.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Log environment variables availability (not their values)
    console.log('Email environment check:', {
      host: process.env.EMAIL_HOST ? 'defined' : 'undefined',
      port: process.env.EMAIL_PORT ? 'defined' : 'undefined',
      user: process.env.EMAIL_USER ? 'defined' : 'undefined',
      pass: process.env.EMAIL_PASS ? 'defined' : 'undefined',
      from: process.env.EMAIL_FROM ? 'defined' : 'undefined',
      bcc: process.env.EMAIL_BCC ? 'defined' : 'undefined'
    });

    // Create test email content
    const testHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="color: #333;">Email Test from Vercel</h2>
        <p>This is a test email sent from the Vercel deployment at ${new Date().toLocaleString()}.</p>
        <p>If you're receiving this email, it means the email configuration is working correctly.</p>
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated test message.</p>
      </div>
    `;

    // Send test email to admin
    const adminResult = await sendEmail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Vercel Deployment',
      html: testHtml
    });

    // Return detailed response
    return res.status(200).json({
      success: adminResult.success,
      message: adminResult.success 
        ? 'Test email sent successfully!' 
        : 'Failed to send test email',
      details: adminResult,
      environmentCheck: {
        host: process.env.EMAIL_HOST ? 'defined' : 'undefined',
        port: process.env.EMAIL_PORT ? 'defined' : 'undefined',
        user: process.env.EMAIL_USER ? 'defined' : 'undefined',
        pass: process.env.EMAIL_PASS ? 'defined' : 'undefined',
        from: process.env.EMAIL_FROM ? 'defined' : 'undefined',
        bcc: process.env.EMAIL_BCC ? 'defined' : 'undefined'
      }
    });

  } catch (error) {
    console.error('Test email error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Error testing email functionality',
      error: error.message
    });
  }
}
