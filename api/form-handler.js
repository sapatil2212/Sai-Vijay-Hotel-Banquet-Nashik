import fetch from 'node-fetch';
import { FORM_ENDPOINT } from './form-endpoint.js';

/**
 * Unified form handler API endpoint
 * Processes all form submissions and sends them to Google Sheets
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
    const formData = req.body;
    console.log('Form submission received:', formData);
    
    // Ensure conditional fields are preserved for contact forms
    if (formData.enquiryType === 'Banquet' && formData.eventType) {
      console.log('Processing Banquet enquiry with event type:', formData.eventType);
    }
    
    // Ensure Room Type and Occupancy Type are preserved for Rooms enquiries
    if (formData.enquiryType === 'Rooms') {
      if (formData.roomType) {
        console.log('Processing Rooms enquiry with room type:', formData.roomType);
      }
      if (formData.occupancyType) {
        console.log('Processing Rooms enquiry with occupancy type:', formData.occupancyType);
      }
    }

    // Ensure formType is set for proper categorization in the sheet
    if (!formData.formType) {
      // Try to determine form type from data structure
      if (formData.roomType) {
        formData.formType = 'room';
      } else if (formData.eventType && !formData.enquiryType) {
        formData.formType = 'banquet';
      } else if (formData.enquiryType) {
        formData.formType = 'contact';
      } else {
        formData.formType = 'unknown';
      }
    }

    // Add timestamp if not already present
    if (!formData.timestamp) {
      formData.timestamp = new Date().toISOString();
    }

    // Submit data to Google Sheet via Apps Script
    console.log('Submitting to Google Sheet:', FORM_ENDPOINT);
    const sheetResponse = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!sheetResponse.ok) {
      throw new Error(`HTTP error! Status: ${sheetResponse.status}`);
    }
    
    const sheetResult = await sheetResponse.json();
    console.log('Google Sheet submission result:', sheetResult);

    return res.status(200).json({
      success: true,
      message: 'Form submission successfully recorded in Google Sheets',
      sheetResponse: sheetResult
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process form submission',
      error: error.message
    });
  }
}
