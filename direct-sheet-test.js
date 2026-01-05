// Direct test script for Google Sheets integration
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet URL from .env
const SHEET_URL = process.env.VITE_WEB_APP_SHEET_URL;
console.log('Using Google Sheet URL:', SHEET_URL);

// Simple test data
const testData = {
  name: "Direct Sheet Test",
  email: "direct-sheet@example.com",
  mobile: "9876543210",
  formType: "direct_test",
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
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(testData),
    });
    
    const responseText = await response.text();
    console.log('Response status:', response.status);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Response:', JSON.stringify(result, null, 2));
      
      if (result.success) {
        console.log('\n✅ SUCCESS: Form submission was successful!');
        
        if (result.sheetName) {
          console.log(`\nIMPORTANT: Look for a sheet named "${result.sheetName}" in your Google Sheet.`);
          console.log(`The data has been written to this sheet.`);
        } else if (result.log && result.log.steps) {
          // Find the sheet name in the steps
          const sheetStep = result.log.steps.find(step => step.includes("Found existing sheet:"));
          if (sheetStep) {
            const sheetName = sheetStep.split("Found existing sheet:")[1].trim();
            console.log(`\nIMPORTANT: Look for a sheet named "${sheetName}" in your Google Sheet.`);
            console.log(`The data has been written to this sheet.`);
          }
        }
        
        console.log('\nDirect link to your Google Sheet:');
        console.log('https://docs.google.com/spreadsheets/d/1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE/');
      } else {
        console.log('\n❌ ERROR: Form submission failed.');
        console.log('Error message:', result.message);
      }
      
      return result.success;
    } catch (e) {
      console.log('Could not parse response as JSON:', e);
      console.log('Raw response:', responseText);
      return false;
    }
  } catch (error) {
    console.error('Error during submission test:', error);
    return false;
  }
}

// Run the test
testDirectSubmission()
  .then(success => {
    console.log('\nTest completed. Success:', success);
  });
