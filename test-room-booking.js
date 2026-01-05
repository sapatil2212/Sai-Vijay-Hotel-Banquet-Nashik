// Test script for Room Booking form submission
const fetch = require('node-fetch');

const API_URL = 'https://script.google.com/macros/s/AKfycbzLrFd08IYW-I7IlgDNgJkxmWJGZzYWcdfwVdeuOCWKv7-zIDrVXAtojdHw3TAJlorBHw/exec';

// Room Booking test data
const roomBookingData = {
  name: "Test User",
  email: "test@example.com",
  contactNo: "9876543210",
  roomType: "Deluxe Room",
  guests: "2",
  checkInDate: "2023-12-15",
  checkOutDate: "2023-12-17",
  specialRequests: "Test room booking request"
};

async function testRoomBooking() {
  try {
    console.log('Sending Room Booking test data...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomBookingData),
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Room Booking test successful!');
    } else {
      console.log('❌ Room Booking test failed:', result.message);
    }
  } catch (error) {
    console.error('Error during Room Booking test:', error);
  }
}

// Run the test
testRoomBooking();
