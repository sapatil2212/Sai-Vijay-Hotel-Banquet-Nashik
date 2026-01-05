// Simple test script with minimal data structure
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet URL from .env
const SHEET_URL = process.env['WEB-APP-SHEET-URL'];
console.log('Using Google Sheet URL:', SHEET_URL);

// Very simple test data with minimal fields
const testData = {
  name: "Simple Test",
  email: "simple@example.com",
  formType: "test"
};

// Function to test direct submission with minimal data
async function testSimpleSubmission() {
  try {
    console.log('Sending simple test data to Google Sheet...');
    console.log('Test data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(SHEET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Raw response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed response:', result);
      return response.ok;
    } catch (e) {
      console.log('Could not parse response as JSON');
      return false;
    }
  } catch (error) {
    console.error('Error during simple submission test:', error);
    return false;
  }
}

// Run the test
testSimpleSubmission()
  .then(success => {
    console.log('Test completed. Success:', success);
  });
