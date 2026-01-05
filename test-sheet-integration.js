// Test script to verify Google Sheets integration for all form types
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the Google Sheet endpoint URL from environment variables
const SHEET_ENDPOINT = process.env["Web-App-Sheet-URL"] || 
                       process.env.GOOGLE_SHEET_DEPLOY_URL || 
                       'https://script.google.com/macros/s/AKfycbx-vS7ysktxcPPXhFmPm_BaRUoR0g0bnQtuJQxD0meRukiGy2IN97_TUk6I1PS8I75l/exec';

console.log('Using Google Sheet endpoint:', SHEET_ENDPOINT);

// Test data for different form types
const testData = {
  contact: {
    name: "Test Contact",
    email: "test-contact@example.com",
    mobile: "9876543210",
    enquiryType: "General",
    message: "This is a test contact form submission",
    formType: "contact",
    timestamp: new Date().toISOString()
  },
  room: {
    name: "Test Room Booking",
    email: "test-room@example.com",
    contactNo: "9876543211",
    roomType: "Deluxe",
    guests: "2",
    checkInDate: "2023-12-25",
    checkOutDate: "2023-12-27",
    specialRequests: "Extra pillows",
    formType: "room",
    timestamp: new Date().toISOString()
  },
  banquet: {
    name: "Test Banquet Booking",
    email: "test-banquet@example.com",
    contactNo: "9876543212",
    eventType: "Wedding Reception",
    guests: "100",
    fromDate: "2023-12-30",
    toDate: "2023-12-31",
    specialRequests: "Vegetarian food only",
    formType: "banquet",
    timestamp: new Date().toISOString()
  }
};

// Function to test form submission
async function testFormSubmission(formType) {
  try {
    console.log(`Testing ${formType} form submission...`);
    
    const response = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData[formType]),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`${formType} form submission result:`, result);
    return result;
  } catch (error) {
    console.error(`Error submitting ${formType} form:`, error);
    return { success: false, error: error.message };
  }
}

// Run tests for all form types
async function runAllTests() {
  console.log('Starting Google Sheet integration tests...');
  
  // Test contact form
  await testFormSubmission('contact');
  
  // Test room booking form
  await testFormSubmission('room');
  
  // Test banquet booking form
  await testFormSubmission('banquet');
  
  console.log('All tests completed!');
}

// Run the tests
runAllTests();
