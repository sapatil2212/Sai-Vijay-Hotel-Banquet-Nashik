// API handler for booking submissions
module.exports = async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

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
