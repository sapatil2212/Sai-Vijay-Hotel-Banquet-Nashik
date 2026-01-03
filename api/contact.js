const nodemailer = require('nodemailer');

// Create transporter function - called fresh each time
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, mobile, enquiryType, eventType, message } = req.body;

    // Validate
    if (!name || !email || !mobile || !enquiryType || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Send admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: New Enquiry: +enquiryType+ from +name,
      html: 
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> +name+</p>
        <p><strong>Email:</strong> +email+</p>
        <p><strong>Mobile:</strong> +mobile+</p>
        <p><strong>Enquiry Type:</strong> +enquiryType+</p>
        +(eventType ? <p><strong>Event Type:</strong> +eventType+</p> : `)+
        <p><strong>Message:</strong> +message+</p>
      
    });

    // Send confirmation to guest
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Hotel Sai Vijay',
      html: 
        <h2>Thank You for Contacting Us!</h2>
        <p>Dear +name+,</p>
        <p>We have received your enquiry and will get back to you within 24 hours.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Enquiry Type: +enquiryType+</li>
          <li>Message: +message+</li>
        </ul>
        <p>Best Regards,<br>Hotel Sai Vijay Team</p>
      
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
};
