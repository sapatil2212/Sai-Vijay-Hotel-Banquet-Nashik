/**
 * Test script to verify form submissions to Google Sheets
 * This directly tests posting to the Google Sheet URL
 */

import fetch from 'node-fetch';

// The correct URL we want to use
const CORRECT_URL = 'https://script.google.com/macros/s/AKfycbxcUn5beNaO6oGlSF4cawDC1ErLLD9zGYXLanMOuqWTYkClmLUA23hdecBqssEVYkb9/exec';

// Test data for each form type
const testData = {
  contact: {
    name: "Test Contact",
    email: "test@example.com",
    mobile: "9876543210",
    enquiryType: "Rooms",
    message: "This is a test contact submission",
    formType: "contact",
    timestamp: new Date().toISOString()
  },
  room: {
    name: "Test Room Booking",
    email: "test@example.com",
    contactNo: "9876543210",
    roomType: "Deluxe Double Room",
    checkInDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days later
    guests: "2",
    kids: "1",
    specialRequirements: "Test room booking",
    formType: "room",
    timestamp: new Date().toISOString()
  },
  banquet: {
    name: "Test Banquet Booking",
    email: "test@example.com",
    contactNo: "9876543210",
    eventType: "Wedding",
    fromDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days later
    toDate: new Date(Date.now() + 86400000 * 8).toISOString(), // 8 days later
    guests: "100",
    specialRequests: "Test banquet booking",
    formType: "banquet",
    timestamp: new Date().toISOString()
  }
};

/**
 * Submit test data to Google Sheet
 */
async function testSubmission(formType) {
  console.log(`Testing ${formType} form submission...`);
  
  try {
    const data = testData[formType];
    console.log(`Submitting to URL: ${CORRECT_URL}`);
    console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    
    const response = await fetch(CORRECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Using text/plain to avoid CORS preflight
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`Response: ${JSON.stringify(result, null, 2)}`);
    
    return {
      success: true,
      result
    };
  } catch (error) {
    console.error(`Error testing ${formType} form:`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('====================================');
  console.log('FORM SUBMISSION TEST');
  console.log('====================================');
  
  const results = {
    contact: await testSubmission('contact'),
    room: await testSubmission('room'),
    banquet: await testSubmission('banquet')
  };
  
  console.log('\n====================================');
  console.log('TEST RESULTS SUMMARY');
  console.log('====================================');
  
  for (const [formType, result] of Object.entries(results)) {
    console.log(`${formType} form: ${result.success ? 'SUCCESS' : 'FAILED'}`);
    if (!result.success) {
      console.log(`- Error: ${result.error}`);
    } else if (result.result && result.result.id) {
      console.log(`- Entry ID: ${result.result.id}`);
    }
  }
  
  const allSuccess = Object.values(results).every(r => r.success);
  
  console.log('\n====================================');
  console.log(`OVERALL RESULT: ${allSuccess ? 'SUCCESS' : 'SOME TESTS FAILED'}`);
  console.log('====================================');
  
  if (allSuccess) {
    console.log('\nAll forms submitted successfully to the correct URL.');
    console.log('Check your Google Sheet to verify entries were created.');
  } else {
    console.log('\nSome form submissions failed. Check the logs above for details.');
  }
}

// Run the tests
runAllTests();
