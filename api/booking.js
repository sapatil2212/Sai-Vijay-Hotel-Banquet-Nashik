// API handler for booking submissions
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
    console.log('Booking request received:', bookingData);
    
    // Validate required fields
    const requiredFields = ['name', 'contactNo', 'email', 'guests', 'roomType'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Return success response for now
    // In a real implementation, you would process the booking here
    return res.status(200).json({
      success: true,
      message: 'Booking request received successfully'
    });
  } catch (error) {
    console.error('Error processing booking request:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
