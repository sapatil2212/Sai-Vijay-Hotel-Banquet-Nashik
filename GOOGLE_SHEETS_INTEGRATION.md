# Google Sheets Integration Documentation

This document explains how form submissions from the Hotel Sai Vijay website are integrated with Google Sheets.

## Overview

All form submissions (Contact, Room Booking, and Banquet Booking) are collected in a single Google Sheet. The integration uses Google Apps Script to handle the form data and store it in the sheet.

## Configuration

### Environment Variables

The Google Apps Script Web App URL is stored in the `.env` file:

```
Web-App-Sheet-URL="https://script.google.com/macros/s/AKfycbx-vS7ysktxcPPXhFmPm_BaRUoR0g0bnQtuJQxD0meRukiGy2IN97_TUk6I1PS8I75l/exec"
```

### Google Sheet Details

- **Sheet ID**: `1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE`
- **Sheet Name**: `All Enquiries`

## Integration Components

### 1. Form Endpoint Configuration (`form-endpoint.js`)

This file centralizes the Google Sheet endpoint URL configuration, pulling it from environment variables.

### 2. API Endpoints

- **Contact Form**: `api/contact.js` - Handles contact form submissions
- **Room Booking**: `api/booking.js` - Handles room booking submissions
- **Banquet Booking**: `api/banquet-booking.js` - Handles banquet booking submissions
- **Unified Handler**: `api/form-handler.js` - A unified endpoint that can handle all form types

### 3. Google Apps Script

The Google Apps Script code runs on Google's servers and handles incoming form data, storing it in the Google Sheet.

## Data Flow

1. User submits a form on the website
2. The form data is sent to the appropriate API endpoint
3. The API endpoint sends the data to the Google Apps Script Web App
4. The Google Apps Script processes the data and adds it to the Google Sheet
5. A confirmation response is sent back to the website

## Form Types and Data Structure

### Contact Form
- name
- email
- mobile
- enquiryType
- message (optional)
- eventType (optional)
- formType: 'contact'
- timestamp

### Room Booking Form
- name
- email
- contactNo
- roomType
- guests
- checkInDate
- checkOutDate
- specialRequests (optional)
- formType: 'room'
- timestamp

### Banquet Booking Form
- name
- email
- contactNo
- eventType
- guests
- fromDate
- toDate
- specialRequests (optional)
- formType: 'banquet'
- timestamp

## Testing

Two test files are included to verify the integration:

1. `test-form.html` - A simple HTML form to test direct submissions to Google Sheets
2. `test-unified-form.html` - A more comprehensive test page with all three form types
3. `test-sheet-integration.js` - A Node.js script to test the integration programmatically

## Troubleshooting

If form submissions are not being recorded in the Google Sheet:

1. Check that the Google Apps Script Web App URL in the `.env` file is correct
2. Verify that the Google Apps Script is deployed as a web app and accessible to anyone
3. Check the browser console for any errors during form submission
4. Try the test files to isolate where the issue might be occurring

## Updating the Integration

### To update the Google Apps Script:

1. Go to the Google Apps Script editor
2. Make your changes to the script
3. Deploy a new version of the web app
4. Update the Web App URL in the `.env` file

### To modify the data structure:

1. Update the relevant API endpoint files to include the new fields
2. Update the Google Apps Script to handle the new fields
3. Update the Google Sheet headers if necessary

## Security Considerations

- The Google Apps Script Web App is publicly accessible, but it only accepts POST requests
- No authentication is required to submit data to the Google Sheet
- Consider adding CORS restrictions to the Google Apps Script if needed
