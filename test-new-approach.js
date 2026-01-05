// Test script for the new simplified Google Apps Script approach
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet URL from .env
const SHEET_URL = process.env.WEB_APP_SHEET_URL;
console.log('Using Google Sheet URL:', SHEET_URL);

// First, test the GET endpoint to see all available sheets
async function testGetRequest() {
  try {
    console.log('\n=== TESTING GET REQUEST ===');
    console.log('Checking available sheets in the Google Sheet...');
    
    const response = await fetch(SHEET_URL);
    const responseText = await response.text();
    
    console.log('Response status:', response.status);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Available sheets:', JSON.stringify(result.availableSheets, null, 2));
      
      if (result.spreadsheetName) {
        console.log('Spreadsheet name:', result.spreadsheetName);
      }
      
      if (result.userEmail) {
        console.log('Script running as user:', result.userEmail);
      }
      
      if (result.accessMode) {
        console.log('Access mode:', result.accessMode);
      }
      
      return { success: response.ok, result };
    } catch (e) {
      console.log('Could not parse GET response as JSON:', e);
      console.log('Raw response:', responseText);
      return { success: false, error: e.message };
    }
  } catch (error) {
    console.error('Error during GET request test:', error);
    return { success: false, error: error.message };
  }
}

// Test data with all required fields
const testData = {
  name: "New Approach Test",
  email: "new-approach@example.com",
  mobile: "9876543210",
  formType: "test",
  timestamp: new Date().toISOString()
};

// Function to test POST submission with the new approach
async function testPostSubmission() {
  try {
    console.log('\n=== TESTING POST SUBMISSION ===');
    console.log('Sending test data to create a new sheet...');
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
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed response:', JSON.stringify(result, null, 2));
      
      if (result.steps) {
        console.log('\n=== SCRIPT EXECUTION STEPS ===');
        result.steps.forEach((step, index) => {
          console.log(`Step ${index + 1}: ${step}`);
        });
      }
      
      if (result.sheetName) {
        console.log('\nData was written to sheet:', result.sheetName);
        console.log('Current row count:', result.rowCount || 'unknown');
      }
      
      return { success: response.ok && result.success, result };
    } catch (e) {
      console.log('Could not parse POST response as JSON:', e);
      console.log('Raw response:', responseText);
      return { success: false, error: e.message };
    }
  } catch (error) {
    console.error('Error during POST submission test:', error);
    return { success: false, error: error.message };
  }
}

// Run both tests
async function runTests() {
  console.log('Starting new approach Google Sheet integration tests...');
  
  // First test GET to check access and available sheets
  const getResult = await testGetRequest();
  
  // Then test POST to submit data to a new sheet
  const postResult = await testPostSubmission();
  
  // Verify results
  console.log('\n=== TEST RESULTS SUMMARY ===');
  console.log('GET request test:', getResult.success ? 'SUCCESS' : 'FAILED');
  console.log('POST submission test:', postResult.success ? 'SUCCESS' : 'FAILED');
  
  if (getResult.success && postResult.success) {
    console.log('\nBoth tests passed! Please check the Google Sheet for a new tab named:');
    if (postResult.result && postResult.result.sheetName) {
      console.log(postResult.result.sheetName);
    } else {
      console.log('(Sheet name not available in response)');
    }
    console.log('\nThis tab should contain your test data. If you can see this tab and data,');
    console.log('then you have confirmed that the Google Apps Script has proper access to the sheet.');
  } else {
    console.log('\nTests failed! Please check the error messages above.');
  }
}

// Run the tests
runTests();
