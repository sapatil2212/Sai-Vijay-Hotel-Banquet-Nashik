/**
 * Google Apps Script for Hotel Sai Vijay Contact Form
 * 
 * Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Copy and paste this code
 * 4. Save the project
 * 5. Deploy as a web app:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Set "Execute as" to "Me"
 *    - Set "Who has access" to "Anyone"
 *    - Click "Deploy"
 * 6. Copy the web app URL and set it as GOOGLE_SHEET_DEPLOY_URL in your .env file
 */

// Set up the spreadsheet headers on first run
function setup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    'Timestamp', 
    'Name', 
    'Email', 
    'Mobile', 
    'Enquiry Type', 
    'Event Type', 
    'Message', 
    'Status', 
    'Follow-up Date', 
    'Notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  
  // Add conditional formatting for status column
  const statusRange = sheet.getRange('H2:H1000');
  
  // Pending - Light Yellow
  const pendingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pending')
    .setBackground('#FFF2CC')
    .setRanges([statusRange])
    .build();
  
  // In Progress - Light Blue
  const inProgressRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('In Progress')
    .setBackground('#D0E0E3')
    .setRanges([statusRange])
    .build();
  
  // Completed - Light Green
  const completedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Completed')
    .setBackground('#D9EAD3')
    .setRanges([statusRange])
    .build();
  
  // Not Interested - Light Red
  const notInterestedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Not Interested')
    .setBackground('#F4CCCC')
    .setRanges([statusRange])
    .build();
  
  const rules = sheet.getConditionalFormatRules();
  rules.push(pendingRule, inProgressRule, completedRule, notInterestedRule);
  sheet.setConditionalFormatRules(rules);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

// Web app entry point - handles POST requests from the website
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not set them up
    if (sheet.getRange('A1').getValue() === '') {
      setup();
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp,
      data.name,
      data.email,
      data.mobile,
      data.enquiryType,
      data.eventType,
      data.message,
      'Pending', // Default status
      '', // Follow-up date (empty)
      '' // Notes (empty)
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Data added to Google Sheet'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    result: 'success',
    message: 'The Google Apps Script is running correctly. Use POST to submit data.'
  })).setMimeType(ContentService.MimeType.JSON);
}
