import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

console.log('Checking environment variables...');
console.log('---------------------------------');

// Check the environment variables
const googleSheetUrl = process.env.VITE_WEB_APP_SHEET_URL;
const googleSheetDeployUrl = process.env.GOOGLE_SHEET_DEPLOY_URL;

console.log('VITE_WEB_APP_SHEET_URL:', googleSheetUrl || 'Not defined');
console.log('GOOGLE_SHEET_DEPLOY_URL:', googleSheetDeployUrl || 'Not defined');

// Test function to send data to Google Sheet
async function testGoogleSheetSubmission() {
  try {
    // Use either variable that's available
    const url = googleSheetUrl || googleSheetDeployUrl;
    
    if (!url) {
      console.error('No Google Sheet URL found in environment variables');
      return false;
    }
    
    console.log('Using URL:', url);
    
    // Create test data
    const testData = {
      formType: 'test',
      name: 'Test User',
      email: 'test@example.com',
      mobile: '9876543210',
      enquiryType: 'Test',
      message: 'This is a test submission from test-env-variables.js',
      timestamp: new Date().toISOString()
    };
    
    // Send the data
    console.log('Sending test data to Google Sheet...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Using text/plain to avoid CORS preflight issues
      },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send data: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Response from Google Sheet:', result);
    
    return result.success;
  } catch (error) {
    console.error('Error sending test data:', error);
    return false;
  }
}

// Run the test
console.log('---------------------------------');
console.log('Running Google Sheet submission test...');

testGoogleSheetSubmission()
  .then(success => {
    console.log('---------------------------------');
    if (success) {
      console.log('✅ Test completed successfully!');
    } else {
      console.log('❌ Test failed. Please check the errors above.');
    }
  })
  .catch(error => {
    console.error('Test error:', error);
    console.log('❌ Test failed with an exception.');
  });
