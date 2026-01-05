// Test script for Contact Enquiry form submission
const fetch = require('node-fetch');

const API_URL = 'https://script.google.com/macros/s/AKfycbzLrFd08IYW-I7IlgDNgJkxmWJGZzYWcdfwVdeuOCWKv7-zIDrVXAtojdHw3TAJlorBHw/exec';

// Contact Enquiry test data
const contactEnquiryData = {
  name: "Test Contact",
  email: "contact@example.com",
  mobile: "7654321098",
  enquiryType: "General",
  message: "This is a test contact enquiry message"
};

async function testContactEnquiry() {
  try {
    console.log('Sending Contact Enquiry test data...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactEnquiryData),
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Contact Enquiry test successful!');
    } else {
      console.log('❌ Contact Enquiry test failed:', result.message);
    }
  } catch (error) {
    console.error('Error during Contact Enquiry test:', error);
  }
}

// Run the test
testContactEnquiry();
