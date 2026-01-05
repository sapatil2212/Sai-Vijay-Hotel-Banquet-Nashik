/**
 * CORS-enabled Google Apps Script for form handling
 * Copy and paste this code into your Google Apps Script editor
 */

// Configuration
const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const SHEET_NAME = "All Enquiries";

/**
 * Set CORS headers for the response
 */
function setCorsHeaders(response) {
  return response
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '3600');
}

/**
 * Handle OPTIONS requests (preflight CORS requests)
 */
function doOptions(e) {
  const response = ContentService.createTextOutput('');
  setCorsHeaders(response);
  return response;
}

// Main function to handle HTTP requests
function doPost(e) {
  // Create a response object that will be returned
  let response = ContentService.createTextOutput();
  
  // Set CORS headers for all responses
  setCorsHeaders(response);
  
  const result = {
    success: false,
    message: "Processing request...",
    steps: []
  };
  
  try {
    // Log the incoming request
    result.steps.push("Received POST request");
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    result.steps.push("Request payload received");
    
    let data;
    try {
      data = JSON.parse(jsonString);
      result.steps.push("Data parsed successfully");
    } catch (parseError) {
      result.steps.push("ERROR: Failed to parse JSON: " + parseError.message);
      throw new Error("Invalid JSON: " + parseError.message);
    }
    
    // Try to open the spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
      result.steps.push("Successfully opened spreadsheet with ID: " + SHEET_ID);
    } catch (ssError) {
      result.steps.push("ERROR: Failed to open spreadsheet: " + ssError.message);
      throw new Error("Spreadsheet access error: " + ssError.message);
    }
    
    // Get the sheet or create it
    let sheet;
    try {
      sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) {
        result.steps.push("Sheet not found, creating new sheet: " + SHEET_NAME);
        sheet = ss.insertSheet(SHEET_NAME);
        setupBasicHeaders(sheet);
      } else {
        result.steps.push("Found existing sheet: " + SHEET_NAME);
      }
    } catch (sheetError) {
      result.steps.push("ERROR: Sheet operation failed: " + sheetError.message);
      throw new Error("Sheet operation error: " + sheetError.message);
    }
    
    // Create a row with timestamp and data
    try {
      const timestamp = new Date();
      const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
      const formType = data.formType || "unknown";
      
      // Prepare row data based on form type
      let rowData = [
        id,                         // ID
        timestamp,                  // Timestamp
        formType,                   // Form Type
        data.name || "No Name",     // Name
        data.email || "No Email",   // Email
        data.mobile || data.contactNo || "No Contact" // Contact
      ];
      
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
      result.steps.push("Attempting to append row with ID: " + id);
      sheet.appendRow(rowData);
      result.steps.push("Row successfully appended");
      
      // Return success
      result.success = true;
      result.message = "Entry recorded successfully";
      result.id = id;
      
    } catch (appendError) {
      result.steps.push("ERROR: Failed to append row: " + appendError.message);
      throw new Error("Failed to append data: " + appendError.message);
    }
    
  } catch (error) {
    result.steps.push("ERROR: " + error.message);
    result.message = "Error: " + error.message;
  }
  
  // Set the response content
  response.setContent(JSON.stringify(result));
  response.setMimeType(ContentService.MimeType.JSON);
  
  return response;
}

// Function to set up headers
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
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

// Function to handle GET requests (for testing)
function doGet() {
  // Create a response object
  let response = ContentService.createTextOutput();
  
  // Set CORS headers
  setCorsHeaders(response);
  
  const result = {
    success: true,
    message: "Google Apps Script is running",
    sheetId: SHEET_ID,
    sheetName: SHEET_NAME
  };
  
  try {
    // Try to open the spreadsheet to verify access
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.spreadsheetName = ss.getName();
    
    // Get sheet info
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet) {
      result.sheetExists = true;
      result.rowCount = sheet.getLastRow();
    } else {
      result.sheetExists = false;
    }
    
    result.userEmail = Session.getEffectiveUser().getEmail();
    
  } catch (error) {
    result.success = false;
    result.message = "Error accessing spreadsheet: " + error.message;
  }
  
  // Set the response content
  response.setContent(JSON.stringify(result));
  response.setMimeType(ContentService.MimeType.JSON);
  
  return response;
}
