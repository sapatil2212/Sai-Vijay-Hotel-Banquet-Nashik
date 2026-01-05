import nodemailer from 'nodemailer';
import { format } from 'date-fns';

// Hotel contact information (same as footer)
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
    twitter: 'https://x.com/hotelsaivijay1',
    instagram: 'https://www.instagram.com/saivijayhotelsandbanquet',
    pinterest: 'https://in.pinterest.com/saivijaynasik/',
    youtube: 'https://www.youtube.com/@saivijay-hotelsbanquet5348'
  }
};

function createTransporter() {
  console.log('Email config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER ? '***configured***' : 'NOT SET',
    pass: process.env.EMAIL_PASS ? '***configured***' : 'NOT SET',
  });

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

// Common email footer
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
    const bookingData = req.body;
    console.log('Banquet booking request received:', bookingData);
    
    // Validate required fields
    const requiredFields = ['name', 'contactNo', 'email', 'eventType', 'guests'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const transporter = createTransporter();

    // Format dates
    const fromDate = bookingData.fromDate ? format(new Date(bookingData.fromDate), 'dd MMM yyyy') : 'Not specified';
    const toDate = bookingData.toDate ? format(new Date(bookingData.toDate), 'dd MMM yyyy') : 'Not specified';
    const eventDate = fromDate === toDate ? fromDate : `${fromDate} to ${toDate}`;

    // Admin email template
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 30px; text-align: center;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 180px; height: auto;">
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a365d; margin-bottom: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            🎉 New Banquet Booking Request
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${bookingData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${bookingData.email}" style="color: #1a365d;">${bookingData.email}</a></p>
            <p style="margin: 10px 0;"><strong>Contact:</strong> <a href="tel:${bookingData.contactNo}" style="color: #1a365d;">${bookingData.contactNo}</a></p>
            <p style="margin: 10px 0;"><strong>Event Type:</strong> <span style="background-color: #D4AF37; color: #1a365d; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${bookingData.eventType}</span></p>
            <p style="margin: 10px 0;"><strong>Number of Guests:</strong> ${bookingData.guests}</p>
            <p style="margin: 10px 0;"><strong>Event Date:</strong> ${eventDate}</p>
            <p style="margin: 10px 0;"><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="tel:${bookingData.contactNo}" style="display: inline-block; background-color: #1a365d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">📞 Call Customer</a>
            <a href="https://wa.me/${bookingData.contactNo.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">💬 WhatsApp</a>
            <a href="mailto:${bookingData.email}" style="display: inline-block; background-color: #D4AF37; color: #1a365d; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">✉️ Reply</a>
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
          <h2 style="color: #1a365d; margin-bottom: 20px;">Thank You for Your Banquet Booking Request!</h2>
          <p style="color: #333; line-height: 1.6;">Dear <strong>${bookingData.name}</strong>,</p>
          <p style="color: #333; line-height: 1.6;">
            Thank you for choosing ${HOTEL_INFO.name} for your <strong>${bookingData.eventType}</strong>! We are honored to be part of your special celebration.
          </p>
          <p style="color: #333; line-height: 1.6;">
            Our events team will contact you shortly to discuss your requirements and confirm the booking.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D4AF37;">
            <h3 style="color: #1a365d; margin-top: 0;">Your Event Details:</h3>
            <p style="margin: 8px 0;"><strong>Event Type:</strong> ${bookingData.eventType}</p>
            <p style="margin: 8px 0;"><strong>Number of Guests:</strong> ${bookingData.guests}</p>
            <p style="margin: 8px 0;"><strong>Event Date:</strong> ${eventDate}</p>
            ${bookingData.specialRequests ? `<p style="margin: 8px 0;"><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ''}
          </div>
          
          <div style="background-color: #1a365d; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 8px 0;">📞 <strong>Phone:</strong> ${HOTEL_INFO.phone1} | ${HOTEL_INFO.phone2}</p>
            <p style="margin: 8px 0;">✉️ <strong>Email:</strong> ${HOTEL_INFO.email}</p>
            <p style="margin: 8px 0;">📍 <strong>Address:</strong> ${HOTEL_INFO.address}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            We look forward to making your event truly memorable!
          </p>
          
          <p style="color: #333; margin-top: 25px;">
            Warm Regards,<br>
            <strong>Team ${HOTEL_INFO.name}</strong>
          </p>
        </div>
        ${emailFooter}
      </div>
    `;

    console.log('Sending admin email to:', process.env.EMAIL_USER);
    console.log('BCC:', process.env.EMAIL_BCC);
    console.log('FROM:', process.env.EMAIL_FROM || process.env.EMAIL_USER);
    
    const adminResult = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `Banquet Booking: ${bookingData.eventType} - ${bookingData.name} (${bookingData.guests} guests)`,
      html: adminHtml
    });
    console.log('Admin email result:', {
      messageId: adminResult.messageId,
      accepted: adminResult.accepted,
      rejected: adminResult.rejected,
      response: adminResult.response
    });

    console.log('Sending guest email to:', bookingData.email);
    const guestResult = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: bookingData.email,
      subject: `Your ${bookingData.eventType} Booking Request - ${HOTEL_INFO.name}`,
      html: guestHtml
    });
    console.log('Guest email result:', {
      messageId: guestResult.messageId,
      accepted: guestResult.accepted,
      rejected: guestResult.rejected,
      response: guestResult.response
    });

    return res.status(200).json({
      success: true,
      message: 'Banquet booking request received successfully. We will contact you shortly.'
    });
  } catch (error) {
    console.error('Error processing banquet booking request:', error);
    console.error('Error details:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
