/**
 * Simplified Google Apps Script for debugging
 * Copy and paste this code into your Google Apps Script editor
 */

// Configuration
const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const SHEET_NAME = "All Enquiries";

// Main function to handle HTTP requests
function doPost(e) {
  try {
    // Log the incoming request
    console.log("Received POST request");
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    console.log("Request payload:", jsonString);
    
    const data = JSON.parse(jsonString);
    console.log("Parsed data:", JSON.stringify(data));
    
    // Try to open the spreadsheet
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      console.log("Successfully opened spreadsheet with ID:", SHEET_ID);
      
      // Get the sheet or create it
      let sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) {
        console.log("Sheet not found, creating new sheet:", SHEET_NAME);
        sheet = ss.insertSheet(SHEET_NAME);
        setupBasicHeaders(sheet);
      } else {
        console.log("Found existing sheet:", SHEET_NAME);
      }
      
      // Create a simple row with timestamp and data
      const timestamp = new Date();
      const rowData = [
        "TEST-" + timestamp.getTime(),  // ID
        timestamp,                       // Timestamp
        "Test Entry",                    // Type
        data.name || "No Name",          // Name
        data.email || "No Email",        // Email
        JSON.stringify(data)             // All Data as JSON
      ];
      
      // Append the data
      console.log("Appending row data:", rowData);
      sheet.appendRow(rowData);
      console.log("Row successfully appended");
      
      // Return success
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Entry recorded successfully (simplified script)",
        id: "TEST-" + timestamp.getTime()
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (ssError) {
      console.error("Error with spreadsheet operations:", ssError.message);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Spreadsheet error: " + ssError.message
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error("Main error:", error.message);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Error: " + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Simple function to set up basic headers
function setupBasicHeaders(sheet) {
  const headers = ["ID", "Timestamp", "Type", "Name", "Email", "Raw Data"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
}

// Function to handle GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Simplified Google Apps Script is running",
    sheetId: SHEET_ID,
    sheetName: SHEET_NAME
  })).setMimeType(ContentService.MimeType.JSON);
}
