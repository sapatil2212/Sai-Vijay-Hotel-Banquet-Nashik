import nodemailer from 'nodemailer';

// Hotel contact information
const HOTEL_INFO = {
  name: 'Sai Vijay Hotel & Banquet',
  phone1: '+91 83780 64999',
  phone2: '+91 83906 33999',
  email: 'saivijaynasik@gmail.com',
  address: '309, 1, Pathardi Phata, Near Taj Gateway, Next to Indoline Furniture, Ambad Link Road, Ambad, Nashik - 422 010',
  website: 'https://hotelsaivijay.com',
  logo: 'https://sai-vijay-hotel-banquet-nashik.vercel.app/email-logo.png',
  social: {
    facebook: 'https://www.facebook.com/saivijayhotels',
    instagram: 'https://www.instagram.com/saivijayhotelsandbanquet',
    youtube: 'https://www.youtube.com/@saivijay-hotelsbanquet5348',
    twitter: 'https://x.com/saivijayhotels',
    pinterest: 'https://www.pinterest.com/saivijayhotels'
  }
};

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 1,
  });
}

// Simple email footer
const emailFooter = `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
    <div style="margin-bottom: 15px;">
      <a href="${HOTEL_INFO.social.facebook}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style="width: 24px; height: 24px;">
      </a>
      <a href="${HOTEL_INFO.social.instagram}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;">
      </a>
      <a href="${HOTEL_INFO.social.youtube}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube" style="width: 24px; height: 24px;">
      </a>
    </div>
    <p style="color: #888; font-size: 12px; margin: 5px 0;">${HOTEL_INFO.name}</p>
    <p style="color: #888; font-size: 12px; margin: 5px 0;">${HOTEL_INFO.address}</p>
    <p style="color: #888; font-size: 12px; margin: 5px 0;">📞 ${HOTEL_INFO.phone1} | ${HOTEL_INFO.phone2}</p>
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
    const { name, email, mobile, enquiryType, eventType, roomType, occupancyType, message } = req.body;

    if (!name || !email || !mobile || !enquiryType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Log the received data for debugging
    console.log('Contact form data received:', {
      name,
      email,
      mobile,
      enquiryType,
      eventType,
      roomType,
      occupancyType,
      message
    });

    const transporter = createTransporter();

    // Simple Admin email template
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fafafa; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 150px; height: auto;">
        </div>
        <div style="padding: 25px;">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 6px;">
            <p style="margin: 10px 0; color: #444;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Mobile:</strong> ${mobile}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Enquiry Type:</strong> ${enquiryType}</p>
            ${eventType ? `<p style="margin: 10px 0; color: #444;"><strong>Event Type:</strong> ${eventType}</p>` : ''}
            ${roomType ? `<p style="margin: 10px 0; color: #444;"><strong>Room Type:</strong> ${roomType}</p>` : ''}
            ${occupancyType ? `<p style="margin: 10px 0; color: #444;"><strong>Occupancy Type:</strong> ${occupancyType}</p>` : ''}
            <p style="margin: 10px 0; color: #444;"><strong>Message:</strong> ${message || 'Not provided'}</p>
          </div>
        </div>
        ${emailFooter}
      </div>
    `;

    // Simple Guest email template
    const guestHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fafafa; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 150px; height: auto;">
        </div>
        <div style="padding: 25px;">
          <h2 style="color: #333; margin-bottom: 15px; font-size: 20px;">Thank You for Contacting Us!</h2>
          <p style="color: #555; line-height: 1.6;">Dear ${name},</p>
          <p style="color: #555; line-height: 1.6;">
            Thank you for reaching out to ${HOTEL_INFO.name}. We have received your enquiry and our team will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #fff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 8px 0; color: #444;"><strong>Your Enquiry:</strong> ${enquiryType}</p>
            ${eventType ? `<p style="margin: 8px 0; color: #444;"><strong>Event Type:</strong> ${eventType}</p>` : ''}
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            For urgent queries, please call us at <strong>${HOTEL_INFO.phone1}</strong>
          </p>
          
          <p style="color: #555; margin-top: 25px;">
            Warm Regards,<br>
            <strong>Team ${HOTEL_INFO.name}</strong>
          </p>
        </div>
        ${emailFooter}
      </div>
    `;

    // Send admin email (to admin only, not to guest)
    console.log('Sending admin email to:', process.env.EMAIL_USER);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `New Enquiry: ${enquiryType} from ${name}`,
      html: adminHtml
    });

    // Send guest email (to guest only)
    console.log('Sending guest email to:', email);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Thank You for Contacting ${HOTEL_INFO.name}`,
      html: guestHtml
    });

    transporter.close();

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

  } catch (error) {
    console.error('Contact form error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
}
