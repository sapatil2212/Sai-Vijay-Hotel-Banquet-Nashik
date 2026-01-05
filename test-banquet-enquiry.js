// Test script for Banquet Enquiry form submission
const fetch = require('node-fetch');

const API_URL = 'https://script.google.com/macros/s/AKfycbzLrFd08IYW-I7IlgDNgJkxmWJGZzYWcdfwVdeuOCWKv7-zIDrVXAtojdHw3TAJlorBHw/exec';

// Banquet Enquiry test data
const banquetEnquiryData = {
  name: "Test Event Organizer",
  email: "organizer@example.com",
  contactNo: "8765432109",
  eventType: "Wedding Reception",
  guests: "100",
  fromDate: "2023-12-20",
  toDate: "2023-12-21",
  specialRequests: "Test banquet booking request"
};

async function testBanquetEnquiry() {
  try {
    console.log('Sending Banquet Enquiry test data...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banquetEnquiryData),
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Banquet Enquiry test successful!');
    } else {
      console.log('❌ Banquet Enquiry test failed:', result.message);
    }
  } catch (error) {
    console.error('Error during Banquet Enquiry test:', error);
  }
}

// Run the test
testBanquetEnquiry();
