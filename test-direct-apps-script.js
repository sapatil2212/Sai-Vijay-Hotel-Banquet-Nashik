// Direct test script for Google Apps Script
import fetch from 'node-fetch';

// Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-vS7ysktxcPPXhFmPm_BaRUoR0g0bnQtuJQxD0meRukiGy2IN97_TUk6I1PS8I75l/exec';

// Test data with all possible fields to help with form type detection
const testData = {
  // Common fields
  name: "Direct Test User",
  email: "direct-test@example.com",
  contactNo: "9876543210",
  
  // Room Booking specific fields
  roomType: "Test Room Type",
  checkInDate: "2023-12-20",
  checkOutDate: "2023-12-22",
  
  // Banquet Enquiry specific fields
  eventType: "Test Event",
  fromDate: "2023-12-25",
  toDate: "2023-12-26",
  
  // Contact Enquiry specific fields
  mobile: "9876543210",
  enquiryType: "Test Enquiry",
  
  // Common optional fields
  guests: "5",
  specialRequests: "This is a direct test to the Google Apps Script",
  message: "Please check if this appears in the Google Sheet",
  
  // Metadata
  testId: "DIRECT-TEST-" + new Date().getTime()
};

async function testDirectToAppsScript() {
  try {
    console.log('Sending direct test to Google Apps Script...');
    console.log('URL:', APPS_SCRIPT_URL);
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Response from Google Apps Script:', result);
    
    if (result.success) {
      console.log('✅ Direct test successful!');
      console.log('📝 Entry ID:', result.id);
      console.log('\nPlease check your Google Sheet to verify the entry was recorded.');
    } else {
      console.log('❌ Direct test failed:', result.message);
    }
  } catch (error) {
    console.error('Error during direct test:', error);
  }
}

// Run the test
testDirectToAppsScript();
