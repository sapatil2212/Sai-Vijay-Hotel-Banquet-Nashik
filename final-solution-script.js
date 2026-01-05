/**
 * FINAL SOLUTION: Google Apps Script for Hotel Sai Vijay Form Handler
 * This script creates a new sheet with a timestamp to ensure it works
 */

// Configuration
const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const DEFAULT_SHEET_NAME = "Form_Submissions";
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "_");
const NEW_SHEET_NAME = "Form_Data_" + TIMESTAMP.substring(0, 16);

// Main function to handle HTTP requests
function doPost(e) {
  const response = {
    success: false,
    message: "Processing request...",
    steps: [],
    sheetName: "",
    rowCount: 0
  };
  
  try {
    response.steps.push("Request received at " + new Date().toISOString());
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    let data;
    
    try {
      data = JSON.parse(jsonString);
      response.steps.push("Successfully parsed JSON data");
    } catch (parseError) {
      response.steps.push("ERROR: Failed to parse JSON: " + parseError.message);
      throw new Error("Invalid JSON: " + parseError.message);
    }
    
    // Access the spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
      response.steps.push("Successfully opened spreadsheet: " + ss.getName());
    } catch (ssError) {
      response.steps.push("ERROR: Failed to open spreadsheet: " + ssError.message);
      throw new Error("Spreadsheet access error: " + ssError.message);
    }
    
    // Create a new sheet specifically for this test
    let sheet;
    try {
      // First try to get the default sheet
      sheet = ss.getSheetByName(DEFAULT_SHEET_NAME);
      
      if (!sheet) {
        // If default sheet doesn't exist, create it
        response.steps.push("Creating default sheet: " + DEFAULT_SHEET_NAME);
        sheet = ss.insertSheet(DEFAULT_SHEET_NAME);
        setupHeaders(sheet);
      } else {
        response.steps.push("Found existing default sheet: " + DEFAULT_SHEET_NAME);
      }
      
      // Also create a new timestamped sheet for this specific test
      response.steps.push("Creating new timestamped sheet: " + NEW_SHEET_NAME);
      const newSheet = ss.insertSheet(NEW_SHEET_NAME);
      setupHeaders(newSheet);
      
      // Use the new sheet for this submission
      sheet = newSheet;
      response.sheetName = NEW_SHEET_NAME;
      
    } catch (sheetError) {
      response.steps.push("ERROR: Sheet creation failed: " + sheetError.message);
      throw new Error("Sheet creation error: " + sheetError.message);
    }
    
    // Prepare row data
    const timestamp = new Date();
    const id = "ENTRY-" + timestamp.getTime();
    const formType = data.formType || "unknown";
    
    // Create a row with the data
    const rowData = [
      id,                         // ID
      timestamp,                  // Timestamp
      formType,                   // Form Type
      data.name || "No Name",     // Name
      data.email || "No Email",   // Email
      data.mobile || data.contactNo || "No Contact", // Contact
      JSON.stringify(data)        // Raw Data
    ];
    
    // Append the data to both sheets
    try {
      response.steps.push("Appending data to sheet: " + sheet.getName());
      sheet.appendRow(rowData);
      
      // Also append to the default sheet if it's different
      if (sheet.getName() !== DEFAULT_SHEET_NAME) {
        const defaultSheet = ss.getSheetByName(DEFAULT_SHEET_NAME);
        if (defaultSheet) {
          defaultSheet.appendRow(rowData);
          response.steps.push("Also appended to default sheet: " + DEFAULT_SHEET_NAME);
        }
      }
      
      // Get the row count
      response.rowCount = sheet.getLastRow();
      response.steps.push("Row successfully appended. Current row count: " + response.rowCount);
      
    } catch (appendError) {
      response.steps.push("ERROR: Failed to append row: " + appendError.message);
      throw new Error("Failed to append data: " + appendError.message);
    }
    
    // Return success
    response.success = true;
    response.message = "Entry successfully recorded in sheet: " + sheet.getName();
    response.id = id;
    
  } catch (error) {
    response.steps.push("ERROR: " + error.message);
    response.message = "Error: " + error.message;
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// Function to set up headers
function setupHeaders(sheet) {
  const headers = [
    "ID", 
    "Timestamp", 
    "Form Type", 
    "Name", 
    "Email", 
    "Contact", 
    "Raw Data"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

// Function to handle GET requests (for testing)
function doGet() {
  const response = {
    success: true,
    message: "Hotel Sai Vijay Form Handler is running",
    sheetId: SHEET_ID,
    availableSheets: [],
    newSheetName: NEW_SHEET_NAME
  };
  
  try {
    // Try to open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    response.spreadsheetName = ss.getName();
    
    // Get all sheet names
    const sheets = ss.getSheets();
    sheets.forEach(function(sheet) {
      response.availableSheets.push({
        name: sheet.getName(),
        rowCount: sheet.getLastRow(),
        colCount: sheet.getLastColumn()
      });
    });
    
    response.userEmail = Session.getEffectiveUser().getEmail();
    
  } catch (error) {
    response.success = false;
    response.message = "Error accessing spreadsheet: " + error.message;
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}
