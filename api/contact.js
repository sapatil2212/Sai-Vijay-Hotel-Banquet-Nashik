import nodemailer from 'nodemailer';

// Hotel contact information (same as footer)
const HOTEL_INFO = {
  name: 'Sai Vijay Hotel & Banquet',
  phone1: '+91 83780 64999',
  phone2: '+91 83906 33999',
  email: 'saivijaynasik@gmail.com',
  address: '309, 1, Pathardi Phata, Near Taj Gateway, Next to Indoline Furniture, Ambad Link Road, Ambad, Nashik - 422 010',
  website: 'https://hotelsaivijay.com',
  // Use a reliable image hosting service for email logos
  // Option 1: Use the deployed site URL
  logo: 'https://sai-vijay-hotel-banquet-nashik.vercel.app/email-logo.png',
  // Social media links
  social: {
    facebook: 'https://www.facebook.com/saivijayhotels',
    twitter: 'https://x.com/hotelsaivijay1',
    instagram: 'https://www.instagram.com/saivijayhotelsandbanquet',
    pinterest: 'https://in.pinterest.com/saivijaynasik/',
    youtube: 'https://www.youtube.com/@saivijay-hotelsbanquet5348'
  }
};

function createTransporter() {
  // Log environment variables (without sensitive data)
  console.log('Email config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER ? '***configured***' : 'NOT SET',
    pass: process.env.EMAIL_PASS ? '***configured***' : 'NOT SET',
    from: process.env.EMAIL_FROM,
    bcc: process.env.EMAIL_BCC
  });

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add connection timeout for serverless
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

// Common email footer with social icons and contact info
const emailFooter = `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #D4AF37;">
    <div style="text-align: center; margin-bottom: 20px;">
      <p style="color: #666; margin-bottom: 10px;">Follow us on social media</p>
      <div>
        <a href="${HOTEL_INFO.social.facebook}" style="display: inline-block; margin: 0 8px;">
          <img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" alt="Facebook" style="width: 28px; height: 28px;">
        </a>
        <a href="${HOTEL_INFO.social.instagram}" style="display: inline-block; margin: 0 8px;">
          <img src="https://cdn-icons-png.flaticon.com/32/2111/2111463.png" alt="Instagram" style="width: 28px; height: 28px;">
        </a>
        <a href="${HOTEL_INFO.social.twitter}" style="display: inline-block; margin: 0 8px;">
          <img src="https://cdn-icons-png.flaticon.com/32/733/733579.png" alt="Twitter" style="width: 28px; height: 28px;">
        </a>
        <a href="${HOTEL_INFO.social.youtube}" style="display: inline-block; margin: 0 8px;">
          <img src="https://cdn-icons-png.flaticon.com/32/1384/1384060.png" alt="YouTube" style="width: 28px; height: 28px;">
        </a>
        <a href="${HOTEL_INFO.social.pinterest}" style="display: inline-block; margin: 0 8px;">
          <img src="https://cdn-icons-png.flaticon.com/32/145/145808.png" alt="Pinterest" style="width: 28px; height: 28px;">
        </a>
      </div>
    </div>
    <div style="text-align: center; color: #666; font-size: 13px;">
      <p style="margin: 5px 0;"><strong>${HOTEL_INFO.name}</strong></p>
      <p style="margin: 5px 0;">📍 ${HOTEL_INFO.address}</p>
      <p style="margin: 5px 0;">📞 ${HOTEL_INFO.phone1} | ${HOTEL_INFO.phone2}</p>
      <p style="margin: 5px 0;">✉️ ${HOTEL_INFO.email}</p>
      <p style="margin: 15px 0 5px;">
        <a href="${HOTEL_INFO.website}" style="color: #D4AF37; text-decoration: none;">Visit our Website</a>
      </p>
    </div>
  </div>
`;

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

    // Validate required fields
    if (!name || !email || !mobile || !enquiryType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('Creating email transporter...');
    const transporter = createTransporter();

    // Verify transporter connection
    try {
      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError.message);
      // Continue anyway - some SMTP servers don't support verify
    }

    // Admin email template
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 30px; text-align: center;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 180px; height: auto;">
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a365d; margin-bottom: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            🔔 New Contact Form Submission
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a365d;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Mobile:</strong> <a href="tel:${mobile}" style="color: #1a365d;">${mobile}</a></p>
            <p style="margin: 10px 0;"><strong>Enquiry Type:</strong> ${enquiryType}</p>
            ${eventType ? `<p style="margin: 10px 0;"><strong>Event Type:</strong> ${eventType}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Message:</strong> ${message || 'Not provided'}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="tel:${mobile}" style="display: inline-block; background-color: #1a365d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">📞 Call Customer</a>
            <a href="https://wa.me/${mobile.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">💬 WhatsApp</a>
            <a href="mailto:${email}" style="display: inline-block; background-color: #D4AF37; color: #1a365d; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">✉️ Reply</a>
          </div>
        </div>
        ${emailFooter}
      </div>
    `;

    // Guest email template
    const guestHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 30px; text-align: center;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 180px; height: auto;">
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a365d; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
          <p style="color: #333; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
          <p style="color: #333; line-height: 1.6;">
            Thank you for reaching out to ${HOTEL_INFO.name}. We have received your <strong>${enquiryType.toLowerCase()}</strong> enquiry and our team will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D4AF37;">
            <h3 style="color: #1a365d; margin-top: 0;">Your Enquiry Details:</h3>
            <p style="margin: 8px 0;"><strong>Enquiry Type:</strong> ${enquiryType}</p>
            ${eventType ? `<p style="margin: 8px 0;"><strong>Event Type:</strong> ${eventType}</p>` : ''}
            ${message ? `<p style="margin: 8px 0;"><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            If you have any urgent queries, please feel free to contact us directly:
          </p>
          
          <div style="background-color: #1a365d; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 8px 0;">📞 <strong>Phone:</strong> ${HOTEL_INFO.phone1} | ${HOTEL_INFO.phone2}</p>
            <p style="margin: 8px 0;">✉️ <strong>Email:</strong> ${HOTEL_INFO.email}</p>
            <p style="margin: 8px 0;">📍 <strong>Address:</strong> ${HOTEL_INFO.address}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            We look forward to serving you and making your experience memorable!
          </p>
          
          <p style="color: #333; margin-top: 25px;">
            Warm Regards,<br>
            <strong>Team ${HOTEL_INFO.name}</strong>
          </p>
        </div>
        ${emailFooter}
      </div>
    `;

    let adminEmailSent = false;
    let guestEmailSent = false;

    // Send email to admin with BCC
    try {
      console.log('Sending admin email to:', process.env.EMAIL_USER);
      console.log('BCC:', process.env.EMAIL_BCC);
      console.log('FROM:', process.env.EMAIL_FROM || process.env.EMAIL_USER);
      
      const adminResult = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        bcc: process.env.EMAIL_BCC,
        subject: `New Enquiry: ${enquiryType} from ${name}`,
        html: adminHtml
      });
      console.log('Admin email result:', {
        messageId: adminResult.messageId,
        accepted: adminResult.accepted,
        rejected: adminResult.rejected,
        response: adminResult.response
      });
      adminEmailSent = true;
    } catch (adminError) {
      console.error('Failed to send admin email:', adminError.message);
      console.error('Admin email error stack:', adminError.stack);
    }

    // Send confirmation to guest
    try {
      console.log('Sending guest email to:', email);
      const guestResult = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: `Thank You for Contacting ${HOTEL_INFO.name}`,
        html: guestHtml
      });
      console.log('Guest email result:', {
        messageId: guestResult.messageId,
        accepted: guestResult.accepted,
        rejected: guestResult.rejected,
        response: guestResult.response
      });
      guestEmailSent = true;
    } catch (guestError) {
      console.error('Failed to send guest email:', guestError.message);
      console.error('Guest email error stack:', guestError.stack);
    }

    // Close the transporter
    transporter.close();

    if (adminEmailSent || guestEmailSent) {
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully!',
        emailsSent: { admin: adminEmailSent, guest: guestEmailSent }
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send emails. Please try again or contact us directly.',
        emailsSent: { admin: adminEmailSent, guest: guestEmailSent }
      });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.',
      error: error.message 
    });
  }
}
