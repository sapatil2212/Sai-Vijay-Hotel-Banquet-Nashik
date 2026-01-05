// Script to test Google Sheet ID and perform a GET request to verify the Apps Script deployment
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet URL from .env
const SHEET_URL = process.env['WEB-APP-SHEET-URL'];
console.log('Using Google Sheet URL:', SHEET_URL);

// Function to test GET request to check if the Apps Script is properly deployed
async function testGetRequest() {
  try {
    console.log('Sending GET request to Google Apps Script...');
    
    const response = await fetch(SHEET_URL);
    
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Raw response:', responseText);
    
    try {
      const result = JSON.parse(responseText);
      console.log('Parsed response:', result);
      
      // Check if the sheet ID matches what we expect
      if (result.sheetId) {
        console.log('Sheet ID from response:', result.sheetId);
        console.log('Expected Sheet ID: 1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE');
        console.log('Match:', result.sheetId === '1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE');
      }
      
      return response.ok;
    } catch (e) {
      console.log('Could not parse response as JSON:', e);
      return false;
    }
  } catch (error) {
    console.error('Error during GET request test:', error);
    return false;
  }
}

// Run the test
testGetRequest()
  .then(success => {
    console.log('Test completed. Success:', success);
  });
