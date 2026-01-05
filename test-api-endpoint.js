// Simple test script to verify the API endpoint is working correctly
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test data for contact form
const testData = {
  name: "API Test",
  email: "api-test@example.com",
  mobile: "9876543210",
  enquiryType: "General",
  message: "This is a test from the API endpoint",
  formType: "contact",
  timestamp: new Date().toISOString()
};

// Function to test the API endpoint
async function testApiEndpoint() {
  try {
    console.log('Testing API endpoint...');
    console.log('Test data:', JSON.stringify(testData, null, 2));
    
    // Send data to the API endpoint
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed response:', result);
      
      if (result.success) {
        console.log('\n✅ SUCCESS: API endpoint is working correctly!');
        console.log('Sheet success:', result.sheetSuccess);
        if (result.sheetError) {
          console.log('Sheet error:', result.sheetError);
        }
      } else {
        console.log('\n❌ ERROR: API request failed.');
        console.log('Error message:', result.message);
      }
    } catch (e) {
      console.log('Could not parse response as JSON:', e);
    }
  } catch (error) {
    console.error('Error testing API endpoint:', error);
  }
}

// Run the test
testApiEndpoint();
