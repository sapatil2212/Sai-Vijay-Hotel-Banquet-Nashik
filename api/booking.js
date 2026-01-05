import { sendEmail } from './email-config.js';
import { createEmailFooter } from './email-footer.js';
import { format } from 'date-fns';

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
    youtube: 'https://www.youtube.com/@saivijay-hotelsbanquet5348'
  }
};

// Using centralized email configuration from email-config.js

// Use the centralized email footer
const emailFooter = createEmailFooter(HOTEL_INFO);

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
    
    const requiredFields = ['name', 'contactNo', 'email', 'guests', 'roomType'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Using centralized email configuration from email-config.js

    const checkInDate = bookingData.checkInDate ? format(new Date(bookingData.checkInDate), 'dd MMM yyyy') : 'Not specified';
    const checkOutDate = bookingData.checkOutDate ? format(new Date(bookingData.checkOutDate), 'dd MMM yyyy') : 'Not specified';

    // Simple Admin email template
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fafafa; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
          <img src="${HOTEL_INFO.logo}" alt="${HOTEL_INFO.name}" style="max-width: 150px; height: auto;">
        </div>
        <div style="padding: 25px;">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 20px;">New Room Booking Request</h2>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 6px;">
            <p style="margin: 10px 0; color: #444;"><strong>Name:</strong> ${bookingData.name}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Email:</strong> ${bookingData.email}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Contact:</strong> ${bookingData.contactNo}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Room Type:</strong> ${bookingData.roomType}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Guests:</strong> ${bookingData.guests} Adults, ${bookingData.kids || '0'} Kids</p>
            <p style="margin: 10px 0; color: #444;"><strong>Check-in:</strong> ${checkInDate}</p>
            <p style="margin: 10px 0; color: #444;"><strong>Check-out:</strong> ${checkOutDate}</p>
            ${bookingData.specialRequirements ? `<p style="margin: 10px 0; color: #444;"><strong>Special Requests:</strong> ${bookingData.specialRequirements}</p>` : ''}
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
          <h2 style="color: #333; margin-bottom: 15px; font-size: 20px;">Thank You for Your Booking Request!</h2>
          <p style="color: #555; line-height: 1.6;">Dear ${bookingData.name},</p>
          <p style="color: #555; line-height: 1.6;">
            Thank you for choosing ${HOTEL_INFO.name}! We have received your room booking request and our team will contact you shortly.
          </p>
          
          <div style="background-color: #fff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 8px 0; color: #444;"><strong>Room Type:</strong> ${bookingData.roomType}</p>
            <p style="margin: 8px 0; color: #444;"><strong>Check-in:</strong> ${checkInDate}</p>
            <p style="margin: 8px 0; color: #444;"><strong>Check-out:</strong> ${checkOutDate}</p>
            <p style="margin: 8px 0; color: #444;"><strong>Guests:</strong> ${bookingData.guests} Adults, ${bookingData.kids || '0'} Kids</p>
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

    // Send admin email (to admin only)
    console.log('Sending admin email to:', process.env.EMAIL_USER);
    const adminResult = await sendEmail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `Room Booking: ${bookingData.roomType} - ${bookingData.name}`,
      html: adminHtml
    });
    
    if (!adminResult.success) {
      console.error('Admin email failed:', adminResult.error);
    }

    // Send guest email (to guest only)
    console.log('Sending guest email to:', bookingData.email);
    const guestResult = await sendEmail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: bookingData.email,
      subject: `Your Room Booking Request - ${HOTEL_INFO.name}`,
      html: guestHtml
    });
    
    if (!guestResult.success) {
      console.error('Guest email failed:', guestResult.error);
    }

    return res.status(200).json({ success: true, message: 'Booking request received successfully.' });

  } catch (error) {
    console.error('Booking error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
