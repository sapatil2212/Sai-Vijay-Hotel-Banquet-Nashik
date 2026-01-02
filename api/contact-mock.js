// Simple mock API handler for testing
module.exports = async function handler(req, res) {
  try {
    // Log the form submission
    console.log('Contact form submission received:', req.body);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
