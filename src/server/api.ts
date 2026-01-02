import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { submitContactForm } from '../lib/api/contactService';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'enquiryType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Additional validation for Banquet enquiry
    if (formData.enquiryType === 'Banquet' && !formData.eventType) {
      return res.status(400).json({
        success: false,
        message: 'Event type is required for Banquet enquiries'
      });
    }
    
    // Submit the form
    const result = await submitContactForm(formData);
    
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
