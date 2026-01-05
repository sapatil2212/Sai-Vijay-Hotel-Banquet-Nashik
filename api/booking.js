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
  logo: 'https://sai-vijay-hotel-banquet-nashik.vercel.app/assets/email-logo.png',
  social: {
    facebook: 'https://www.facebook.com/saivijayhotels',
    twitter: 'https://x.com/hotelsaivijay1',
    instagram: 'https://www.instagram.com/saivijayhotelsandbanquet',
    pinterest: 'https://in.pinterest.com/saivijaynasik/',
    youtube: 'https://www.youtube.com/@saivijay-hotelsbanquet5348'
  }
};

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
    console.log('Room booking request received:', bookingData);
    
    // Validate required fields
    const requiredFields = ['name', 'contactNo', 'email', 'guests', 'roomType'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const transporter = createTransporter();

    // Format dates
    const checkInDate = bookingData.checkInDate ? format(new Date(bookingData.checkInDate), 'dd MMM yyyy') : 'Not specified';
    const checkOutDate = bookingData.checkOutDate ? format(new Date(bookingData.checkOutDate), 'dd MMM yyyy') : 'Not specified';

    // Admin email template
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 30px; text-align: center;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 180px; height: auto;">
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a365d; margin-bottom: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            🏨 New Room Booking Request
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${bookingData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${bookingData.email}" style="color: #1a365d;">${bookingData.email}</a></p>
            <p style="margin: 10px 0;"><strong>Contact:</strong> <a href="tel:${bookingData.contactNo}" style="color: #1a365d;">${bookingData.contactNo}</a></p>
            <p style="margin: 10px 0;"><strong>Room Type:</strong> ${bookingData.roomType}</p>
            <p style="margin: 10px 0;"><strong>Guests:</strong> ${bookingData.guests}</p>
            <p style="margin: 10px 0;"><strong>Kids:</strong> ${bookingData.kids || '0'}</p>
            <p style="margin: 10px 0;"><strong>Check-in:</strong> ${checkInDate}</p>
            <p style="margin: 10px 0;"><strong>Check-out:</strong> ${checkOutDate}</p>
            <p style="margin: 10px 0;"><strong>Special Requests:</strong> ${bookingData.specialRequirements || 'None'}</p>
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
          <h2 style="color: #1a365d; margin-bottom: 20px;">Thank You for Your Booking Request!</h2>
          <p style="color: #333; line-height: 1.6;">Dear <strong>${bookingData.name}</strong>,</p>
          <p style="color: #333; line-height: 1.6;">
            Thank you for choosing ${HOTEL_INFO.name}! We have received your room booking request and our team will contact you shortly to confirm availability.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D4AF37;">
            <h3 style="color: #1a365d; margin-top: 0;">Your Booking Details:</h3>
            <p style="margin: 8px 0;"><strong>Room Type:</strong> ${bookingData.roomType}</p>
            <p style="margin: 8px 0;"><strong>Guests:</strong> ${bookingData.guests} Adults, ${bookingData.kids || '0'} Kids</p>
            <p style="margin: 8px 0;"><strong>Check-in:</strong> ${checkInDate}</p>
            <p style="margin: 8px 0;"><strong>Check-out:</strong> ${checkOutDate}</p>
            ${bookingData.specialRequirements ? `<p style="margin: 8px 0;"><strong>Special Requests:</strong> ${bookingData.specialRequirements}</p>` : ''}
          </div>
          
          <div style="background-color: #1a365d; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 8px 0;">📞 <strong>Phone:</strong> ${HOTEL_INFO.phone1} | ${HOTEL_INFO.phone2}</p>
            <p style="margin: 8px 0;">✉️ <strong>Email:</strong> ${HOTEL_INFO.email}</p>
            <p style="margin: 8px 0;">📍 <strong>Address:</strong> ${HOTEL_INFO.address}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            We look forward to hosting you!
          </p>
          
          <p style="color: #333; margin-top: 25px;">
            Warm Regards,<br>
            <strong>Team ${HOTEL_INFO.name}</strong>
          </p>
        </div>
        ${emailFooter}
      </div>
    `;

    console.log('Sending admin email...');
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `Room Booking Request: ${bookingData.roomType} - ${bookingData.name}`,
      html: adminHtml
    });
    console.log('Admin email sent');

    console.log('Sending guest email to:', bookingData.email);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: bookingData.email,
      subject: `Your Room Booking Request - ${HOTEL_INFO.name}`,
      html: guestHtml
    });
    console.log('Guest email sent');

    return res.status(200).json({
      success: true,
      message: 'Booking request received successfully. We will contact you shortly.'
    });
  } catch (error) {
    console.error('Error processing booking request:', error);
    console.error('Error details:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
