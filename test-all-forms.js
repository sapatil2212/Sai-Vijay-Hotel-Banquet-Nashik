// Comprehensive test script for all form types
import fetch from 'node-fetch';

const API_URL = 'https://script.google.com/macros/s/AKfycbzLrFd08IYW-I7IlgDNgJkxmWJGZzYWcdfwVdeuOCWKv7-zIDrVXAtojdHw3TAJlorBHw/exec';

// Test data for all form types
const testData = {
  roomBooking: {
    name: "Test User",
    email: "test@example.com",
    contactNo: "9876543210",
    roomType: "Deluxe Room",
    guests: "2",
    checkInDate: "2023-12-15",
    checkOutDate: "2023-12-17",
    specialRequests: "Test room booking request"
  },
  banquetEnquiry: {
    name: "Test Event Organizer",
    email: "organizer@example.com",
    contactNo: "8765432109",
    eventType: "Wedding Reception",
    guests: "100",
    fromDate: "2023-12-20",
    toDate: "2023-12-21",
    specialRequests: "Test banquet booking request"
  },
  contactEnquiry: {
    name: "Test Contact",
    email: "contact@example.com",
    mobile: "7654321098",
    enquiryType: "General",
    message: "This is a test contact enquiry message"
  }
};

// Function to send a test request
async function sendTestRequest(formType, data) {
  try {
    console.log(`\n🔍 Testing ${formType}...`);
    console.log(`Sending data: ${JSON.stringify(data, null, 2)}`);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log(`Response: ${JSON.stringify(result, null, 2)}`);
    
    if (result.success) {
      console.log(`✅ ${formType} test successful!`);
      console.log(`📝 Entry ID: ${result.id}`);
      return true;
    } else {
      console.log(`❌ ${formType} test failed: ${result.message}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error during ${formType} test:`, error);
    return false;
  }
}

// Run all tests sequentially
async function runAllTests() {
  console.log('🚀 Starting form submission tests...');
  
  // Test Room Booking
  const roomBookingResult = await sendTestRequest('Room Booking', testData.roomBooking);
  
  // Wait a bit between requests to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test Banquet Enquiry
  const banquetEnquiryResult = await sendTestRequest('Banquet Enquiry', testData.banquetEnquiry);
  
  // Wait a bit between requests
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test Contact Enquiry
  const contactEnquiryResult = await sendTestRequest('Contact Enquiry', testData.contactEnquiry);
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`Room Booking: ${roomBookingResult ? '✅ Passed' : '❌ Failed'}`);
  console.log(`Banquet Enquiry: ${banquetEnquiryResult ? '✅ Passed' : '❌ Failed'}`);
  console.log(`Contact Enquiry: ${contactEnquiryResult ? '✅ Passed' : '❌ Failed'}`);
  
  console.log('\n📋 Next Steps:');
  console.log('1. Check your Google Sheet to verify all test entries were recorded correctly');
  console.log('2. Verify that each form type has the correct fields populated');
  console.log('3. Check that timestamps and IDs were generated properly');
}

// Run the tests
runAllTests();
