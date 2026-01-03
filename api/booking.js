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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests for actual processing
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

    // Format check-in/check-out dates if available
    const checkInDate = bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString() : 'Not specified';
    const checkOutDate = bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString() : 'Not specified';

    // Send email to admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.ibb.co/Qp1SXBt/logo.png" alt="Hotel Sai Vijay" style="max-width: 200px;">
        </div>
        <h2 style="color: #1a365d;">New Room Booking Request</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          <p><strong>Name:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Contact:</strong> ${bookingData.contactNo}</p>
          <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
          <p><strong>Guests:</strong> ${bookingData.guests}</p>
          <p><strong>Check-in:</strong> ${checkInDate}</p>
          <p><strong>Check-out:</strong> ${checkOutDate}</p>
          <p><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `Room Booking Request: ${bookingData.roomType} for ${bookingData.name}`,
      html: adminHtml
    });

    // Send confirmation to guest
    const guestHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.ibb.co/Qp1SXBt/logo.png" alt="Hotel Sai Vijay" style="max-width: 200px;">
        </div>
        <h2 style="color: #1a365d;">Thank You for Your Booking Request</h2>
        <p>Dear ${bookingData.name},</p>
        <p>We have received your room booking request for <strong>${bookingData.roomType}</strong>.</p>
        <p>Our team will contact you shortly to confirm availability and complete your reservation.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Booking Details:</strong></p>
          <p>Room Type: ${bookingData.roomType}</p>
          <p>Guests: ${bookingData.guests}</p>
          <p>Check-in: ${checkInDate}</p>
          <p>Check-out: ${checkOutDate}</p>
        </div>
        <p>If you have any questions, please contact us at:</p>
        <p>📞 Phone: +91 91300 70701</p>
        <p>📧 Email: saivijaynashik@gmail.com</p>
        <p>Best Regards,<br>Hotel Sai Vijay Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: bookingData.email,
      subject: 'Your Room Booking Request - Hotel Sai Vijay',
      html: guestHtml
    });

    return res.status(200).json({
      success: true,
      message: 'Booking request received successfully. We will contact you shortly.'
    });
  } catch (error) {
    console.error('Error processing booking request:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
