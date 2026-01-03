import nodemailer from 'nodemailer';

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

export default async function handler(req, res) {
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

    // Validate required fields (message is now optional)
    if (!name || !email || !mobile || !enquiryType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const transporter = createTransporter();

    // Admin email template with logo
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.ibb.co/Qp1SXBt/logo.png" alt="Hotel Sai Vijay" style="max-width: 200px;">
        </div>
        <h2 style="color: #1a365d;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
          ${eventType ? `<p><strong>Event Type:</strong> ${eventType}</p>` : ''}
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : '<p><strong>Message:</strong> Not provided</p>'}
        </div>
      </div>
    `;

    // Send email to admin with BCC
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `New Enquiry: ${enquiryType} from ${name}`,
      html: adminHtml
    });

    // Guest email template with logo
    const guestHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.ibb.co/Qp1SXBt/logo.png" alt="Hotel Sai Vijay" style="max-width: 200px;">
        </div>
        <h2 style="color: #1a365d;">Thank You for Contacting Us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your ${enquiryType.toLowerCase()} enquiry and will get back to you within 24 hours.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p>If you have any urgent queries, please contact us at:</p>
          <p> Phone: +91 91300 70701</p>
          <p> Email: saivijaynashik@gmail.com</p>
        </div>
        <p>Best Regards,<br>Hotel Sai Vijay Team</p>
      </div>
    `;

    // Send confirmation to guest
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Hotel Sai Vijay',
      html: guestHtml
    });

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};
