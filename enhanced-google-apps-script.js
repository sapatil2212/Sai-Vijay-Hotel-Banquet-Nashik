/**
 * Enhanced Google Apps Script with detailed logging
 * Copy and paste this code into your Google Apps Script editor
 */

// Configuration
const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const SHEET_NAME = "All Enquiries";

// Main function to handle HTTP requests
function doPost(e) {
  const logData = {
    timestamp: new Date().toISOString(),
    steps: []
  };
  
  try {
    // Log the incoming request
    logData.steps.push("Received POST request");
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    logData.steps.push(`Request payload: ${jsonString}`);
    
    let data;
    try {
      data = JSON.parse(jsonString);
      logData.steps.push(`Successfully parsed JSON data: ${JSON.stringify(data)}`);
    } catch (parseError) {
      logData.steps.push(`Failed to parse JSON: ${parseError.message}`);
      throw new Error(`Invalid JSON: ${parseError.message}`);
    }
    
    // Try to open the spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
      logData.steps.push(`Successfully opened spreadsheet with ID: ${SHEET_ID}`);
    } catch (ssError) {
      logData.steps.push(`Failed to open spreadsheet: ${ssError.message}`);
      throw new Error(`Spreadsheet access error: ${ssError.message}`);
    }
    
    // Get the sheet or create it
    let sheet;
    try {
      sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) {
        logData.steps.push(`Sheet not found, creating new sheet: ${SHEET_NAME}`);
        sheet = ss.insertSheet(SHEET_NAME);
        setupBasicHeaders(sheet);
      } else {
        logData.steps.push(`Found existing sheet: ${SHEET_NAME}`);
      }
    } catch (sheetError) {
      logData.steps.push(`Error with sheet operations: ${sheetError.message}`);
      throw new Error(`Sheet operation error: ${sheetError.message}`);
    }
    
    // Create a row with timestamp and data
    const timestamp = new Date();
    const formType = data.formType || "unknown";
    
    // Create a unique ID based on form type and timestamp
    const uniqueId = `ENQ-${timestamp.getTime()}-${Math.floor(Math.random() * 10000)}`;
    
    // Prepare row data based on form type
    let rowData = [uniqueId, timestamp, formType];
    
    // Add common fields
    rowData.push(data.name || "No Name");
    rowData.push(data.email || "No Email");
    
    // Add contact number (might be in different fields based on form type)
    rowData.push(data.mobile || data.contactNo || "No Contact");
    
    // Add form-specific fields
    if (formType === "room") {
      rowData.push(data.roomType || "Not specified");
      rowData.push(data.guests || "Not specified");
      rowData.push(data.checkInDate || "Not specified");
      rowData.push(data.checkOutDate || "Not specified");
      rowData.push(data.specialRequests || "None");
    } else if (formType === "banquet") {
      rowData.push(data.eventType || "Not specified");
      rowData.push(data.guests || "Not specified");
      rowData.push(data.fromDate || "Not specified");
      rowData.push(data.toDate || "Not specified");
      rowData.push(data.specialRequests || "None");
    } else if (formType === "contact") {
      rowData.push(data.enquiryType || "Not specified");
      rowData.push(data.message || "None");
      rowData.push(""); // Empty cell for consistency
      rowData.push(""); // Empty cell for consistency
      rowData.push(""); // Empty cell for consistency
    } else {
      // Generic handling for unknown form types
      rowData.push(""); // Empty cell for consistency
      rowData.push(""); // Empty cell for consistency
      rowData.push(""); // Empty cell for consistency
      rowData.push(""); // Empty cell for consistency
      rowData.push(""); // Empty cell for consistency
    }
    
    // Add raw JSON data as the last column for debugging
    rowData.push(JSON.stringify(data));
    
    // Append the data
    try {
      logData.steps.push(`Attempting to append row data: ${JSON.stringify(rowData)}`);
      sheet.appendRow(rowData);
      logData.steps.push("Row successfully appended");
    } catch (appendError) {
      logData.steps.push(`Failed to append row: ${appendError.message}`);
      throw new Error(`Failed to append data: ${appendError.message}`);
    }
    
    // Return success with log data
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Entry recorded successfully",
      id: uniqueId,
      log: logData
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    logData.steps.push(`Error: ${error.message}`);
    
    // Return error with log data
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: `Error: ${error.message}`,
      log: logData
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up headers based on form types
function setupBasicHeaders(sheet) {
  const headers = [
    "ID",
    "Timestamp",
    "Form Type",
    "Name",
    "Email",
    "Contact",
    "Room/Event Type",
    "Guests",
    "Check-in/From Date",
    "Check-out/To Date",
    "Special Requests/Message",
    "Raw Data"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns to fit content
  sheet.autoResizeColumns(1, headers.length);
}

// Function to handle GET requests (for testing)
function doGet() {
  try {
    // Try to open the spreadsheet to verify access
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    const sheetExists = sheet !== null;
    
    // Get row count if sheet exists
    const rowCount = sheetExists ? sheet.getLastRow() : 0;
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Enhanced Google Apps Script is running",
      sheetId: SHEET_ID,
      sheetName: SHEET_NAME,
      sheetExists: sheetExists,
      rowCount: rowCount,
      userEmail: Session.getEffectiveUser().getEmail()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: `Error: ${error.message}`,
      sheetId: SHEET_ID,
      sheetName: SHEET_NAME
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
