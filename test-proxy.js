// Test script for the server-side proxy solution
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Simple test data
const testData = {
  name: "Proxy Test",
  email: "proxy-test@example.com",
  mobile: "9876543210",
  enquiryType: "General",
  message: "Testing the server-side proxy solution",
  formType: "contact",
  timestamp: new Date().toISOString()
};

// Function to test the proxy
async function testProxy() {
  try {
    console.log('Testing server-side proxy...');
    console.log('Sending test data:', JSON.stringify(testData, null, 2));
    
    // Send data to the proxy endpoint
    const response = await fetch('http://localhost:3000/api/sheet-proxy', {
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
        console.log('\n✅ SUCCESS: Proxy is working correctly!');
        console.log('Entry ID:', result.id);
      } else {
        console.log('\n❌ ERROR: Proxy request failed.');
        console.log('Error message:', result.message);
      }
    } catch (e) {
      console.log('Could not parse response as JSON:', e);
    }
  } catch (error) {
    console.error('Error testing proxy:', error);
  }
}

// Run the test
testProxy();
