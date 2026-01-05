// Enhanced debug script for Google Sheets integration
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet URL from .env
const SHEET_URL = process.env.WEB_APP_SHEET_URL;
console.log('Using Google Sheet URL:', SHEET_URL);

// First, test the GET endpoint to verify sheet access
async function testGetRequest() {
  try {
    console.log('\n=== TESTING GET REQUEST ===');
    console.log('Sending GET request to check Google Sheet access...');
    
    const response = await fetch(SHEET_URL);
    const responseText = await response.text();
    
    console.log('Response status:', response.status);
    console.log('Raw response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed GET response:', result);
      
      if (result.sheetId) {
        console.log('Sheet ID from response:', result.sheetId);
        console.log('Expected Sheet ID: 1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE');
        console.log('Sheet ID match:', result.sheetId === '1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE');
      }
      
      if (result.sheetExists !== undefined) {
        console.log('Sheet exists:', result.sheetExists);
      }
      
      if (result.rowCount !== undefined) {
        console.log('Current row count:', result.rowCount);
      }
      
      if (result.userEmail) {
        console.log('Script running as user:', result.userEmail);
      }
      
      return { success: response.ok, result };
    } catch (e) {
      console.log('Could not parse GET response as JSON:', e);
      return { success: false, error: e.message };
    }
  } catch (error) {
    console.error('Error during GET request test:', error);
    return { success: false, error: error.message };
  }
}

// Test data with all required fields
const testData = {
  name: "Debug Test",
  email: "debug-test@example.com",
  mobile: "9876543210",
  formType: "debug",
  timestamp: new Date().toISOString()
};

// Function to test POST submission with detailed logging
async function testPostSubmission() {
  try {
    console.log('\n=== TESTING POST SUBMISSION ===');
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
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    console.log('Raw response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed POST response:', result);
      
      // Check for detailed logs in the response
      if (result.log && result.log.steps) {
        console.log('\n=== SCRIPT EXECUTION STEPS ===');
        result.log.steps.forEach((step, index) => {
          console.log(`Step ${index + 1}: ${step}`);
        });
      }
      
      return { success: response.ok, result };
    } catch (e) {
      console.log('Could not parse POST response as JSON:', e);
      return { success: false, error: e.message };
    }
  } catch (error) {
    console.error('Error during POST submission test:', error);
    return { success: false, error: error.message };
  }
}

// Run both tests
async function runTests() {
  console.log('Starting enhanced Google Sheet integration tests...');
  
  // First test GET to check access
  const getResult = await testGetRequest();
  
  // Then test POST to submit data
  const postResult = await testPostSubmission();
  
  // Verify results
  console.log('\n=== TEST RESULTS SUMMARY ===');
  console.log('GET request test:', getResult.success ? 'SUCCESS' : 'FAILED');
  console.log('POST submission test:', postResult.success ? 'SUCCESS' : 'FAILED');
  
  if (getResult.success && postResult.success) {
    console.log('\nBoth tests passed! If the sheet is still empty, check:');
    console.log('1. Are you looking at the correct Google Sheet?');
    console.log('2. Does the sheet have a tab named "All Enquiries"?');
    console.log('3. Does the Google account running the script have edit access to the sheet?');
  } else {
    console.log('\nTests failed! Please check the error messages above.');
  }
}

// Run the tests
runTests();
