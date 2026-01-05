// Simple script to directly test Google Sheet submission
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet URL from .env
// Note: Environment variable names are case-sensitive
const SHEET_URL = process.env.WEB_APP_SHEET_URL;
console.log('Using Google Sheet URL:', SHEET_URL);

// Test data with all required fields
const testData = {
  name: "Direct Test",
  email: "direct-test@example.com",
  mobile: "9876543210",
  formType: "test",
  timestamp: new Date().toISOString()
};

// Function to test direct submission
async function testDirectSubmission() {
  try {
    console.log('Sending test data to Google Sheet...');
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
    console.log('Response headers:', response.headers);
    console.log('Raw response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed response:', result);
    } catch (e) {
      console.log('Could not parse response as JSON');
    }
    
    return response.ok;
  } catch (error) {
    console.error('Error during direct submission test:', error);
    return false;
  }
}

// Run the test
testDirectSubmission()
  .then(success => {
    console.log('Test completed. Success:', success);
  });
