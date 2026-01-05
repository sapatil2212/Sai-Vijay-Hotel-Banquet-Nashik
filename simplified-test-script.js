/**
 * Simplified Google Apps Script for direct testing
 * Copy and paste this code into your Google Apps Script editor
 */

// Configuration
const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const SHEET_NAME = "Test_Sheet_" + new Date().getTime(); // Create a unique sheet name

// Main function to handle HTTP requests
function doPost(e) {
  const response = {
    success: false,
    message: "Processing...",
    steps: []
  };
  
  try {
    // Log the incoming request
    response.steps.push("Received POST request");
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    response.steps.push("Request payload received");
    
    const data = JSON.parse(jsonString);
    response.steps.push("Data parsed successfully");
    
    // Try to open the spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
      response.steps.push("Successfully opened spreadsheet with ID: " + SHEET_ID);
    } catch (ssError) {
      response.steps.push("ERROR: Failed to open spreadsheet: " + ssError.message);
      throw new Error("Spreadsheet access error: " + ssError.message);
    }
    
    // Create a new sheet (to avoid any issues with existing sheets)
    let sheet;
    try {
      // First try to get the sheet if it exists
      sheet = ss.getSheetByName(SHEET_NAME);
      
      if (!sheet) {
        response.steps.push("Creating new sheet: " + SHEET_NAME);
        sheet = ss.insertSheet(SHEET_NAME);
        
        // Set up headers
        const headers = ["ID", "Timestamp", "Name", "Email", "Data"];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
        response.steps.push("Headers set up in new sheet");
      } else {
        response.steps.push("Found existing sheet: " + SHEET_NAME);
      }
    } catch (sheetError) {
      response.steps.push("ERROR: Sheet operation failed: " + sheetError.message);
      throw new Error("Sheet operation error: " + sheetError.message);
    }
    
    // Create a simple row with timestamp and data
    try {
      const timestamp = new Date();
      const id = "TEST-" + timestamp.getTime();
      
      const rowData = [
        id,
        timestamp,
        data.name || "No Name",
        data.email || "No Email",
        JSON.stringify(data)
      ];
      
      response.steps.push("Attempting to append row with ID: " + id);
      sheet.appendRow(rowData);
      response.steps.push("Row successfully appended");
      
      // Get the current row count to verify
      const rowCount = sheet.getLastRow();
      response.steps.push("Current row count: " + rowCount);
      
      // Return success
      response.success = true;
      response.message = "Entry recorded successfully in sheet: " + SHEET_NAME;
      response.id = id;
      response.sheetName = SHEET_NAME;
      response.rowCount = rowCount;
      
    } catch (appendError) {
      response.steps.push("ERROR: Failed to append row: " + appendError.message);
      throw new Error("Failed to append data: " + appendError.message);
    }
    
  } catch (error) {
    response.steps.push("ERROR: " + error.message);
    response.message = "Error: " + error.message;
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to handle GET requests (for testing)
function doGet() {
  const response = {
    success: true,
    message: "Simplified test script is running",
    sheetId: SHEET_ID,
    availableSheets: []
  };
  
  try {
    // Try to open the spreadsheet to verify access
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
    response.accessMode = "Full access confirmed";
    
  } catch (error) {
    response.success = false;
    response.message = "Error accessing spreadsheet: " + error.message;
    response.accessMode = "Access denied";
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
