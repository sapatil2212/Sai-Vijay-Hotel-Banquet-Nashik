# Hotel Sai Vijay Form Integration Documentation

This document explains how form submissions from the Hotel Sai Vijay website are processed and stored.

## Overview

All form submissions (Room Booking, Banquet Enquiry, Contact Us) are:
1. Sent to the user via email
2. Stored in a Google Sheet for record-keeping

## Google Sheet Integration

All form submissions are automatically stored in a single Google Sheet:

- **Google Sheet URL**: [Hotel Sai Vijay Enquiries](https://docs.google.com/spreadsheets/d/1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE/)
- **Google Apps Script Endpoint**: `https://script.google.com/macros/s/AKfycbzLrFd08IYW-I7IlgDNgJkxmWJGZzYWcdfwVdeuOCWKv7-zIDrVXAtojdHw3TAJlorBHw/exec`

## Form Types and Fields

### Room Booking Form
- `name`: Guest name
- `email`: Guest email
- `contactNo`: Contact number
- `roomType`: Type of room requested
- `guests`: Number of guests
- `checkInDate`: Check-in date (YYYY-MM-DD format)
- `checkOutDate`: Check-out date (YYYY-MM-DD format)
- `specialRequests`: Any special requests (optional)

### Banquet Enquiry Form
- `name`: Event organizer name
- `email`: Organizer email
- `contactNo`: Contact number
- `eventType`: Type of event (Wedding, Reception, etc.)
- `guests`: Number of guests
- `fromDate`: Event start date (YYYY-MM-DD format)
- `toDate`: Event end date (YYYY-MM-DD format)
- `specialRequests`: Any special requests (optional)

### Contact Enquiry Form
- `name`: Contact person name
- `email`: Contact email
- `mobile`: Contact number
- `enquiryType`: Type of enquiry (General, Feedback, etc.)
- `eventType`: Type of event (optional)
- `message`: Enquiry message (optional)

## How It Works

1. When a form is submitted on the website, the data is sent to the corresponding API endpoint (`/api/booking.js`, `/api/banquet-booking.js`, or `/api/contact.js`).
2. The API handler sends the data to the Google Apps Script endpoint.
3. The Google Apps Script processes the data and adds it to the Google Sheet.
4. The API handler also sends email notifications to both the hotel staff and the customer.

## Google Sheet Structure

The Google Sheet has the following columns:

1. **ID**: Unique identifier for each submission (format: ENQ-timestamp-random)
2. **Timestamp**: When the form was submitted
3. **Form Type**: Room Booking, Banquet Enquiry, or Contact Enquiry
4. **Name**: Customer name
5. **Email**: Customer email
6. **Contact Number**: Customer phone number
7. **Room Type**: For Room Booking
8. **Check-in Date**: For Room Booking
9. **Check-out Date**: For Room Booking
10. **Event Type**: For Banquet Enquiry
11. **Event Start Date**: For Banquet Enquiry
12. **Event End Date**: For Banquet Enquiry
13. **Enquiry Type**: For Contact Enquiry
14. **Number of Guests**: For Room Booking and Banquet Enquiry
15. **Special Requests**: For all form types
16. **Message**: For Contact Enquiry
17. **IP Address**: Submission IP address (if available)
18. **User Agent**: Browser/device information (if available)

## Adding New Form Fields

If you need to add new fields to any of the forms:

1. Update the form in your website's frontend
2. Update the corresponding API handler to include the new field
3. No changes are needed in the Google Apps Script - it will automatically store all fields sent in the request

## Troubleshooting

If form submissions are not appearing in the Google Sheet:

1. Check the browser console for any errors during form submission
2. Verify that the form data is being sent correctly to the API endpoint
3. Check that the Google Apps Script endpoint is correct in the `form-endpoint.js` file
4. Ensure the Google Apps Script deployment is still active and has not expired

## Maintenance

- The Google Apps Script deployment may need to be redeployed periodically if Google makes changes to their platform
- If you need to modify how data is stored or processed, you'll need to update the Google Apps Script code and redeploy it
