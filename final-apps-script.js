/**
 * Google Apps Script for form handling
 * Deploy as: Web App > Execute as: Me > Access: Anyone
 */

const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const SHEET_NAME = "Form Submissions";

function doPost(e) {
  const result = {
    success: false,
    message: "Processing request...",
    steps: []
  };
  
  try {
    result.steps.push("Received POST request");
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    let data;
    try {
      data = JSON.parse(jsonString);
      result.steps.push("Data parsed successfully");
    } catch (parseError) {
      throw new Error("Invalid JSON: " + parseError.message);
    }
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.steps.push("Opened spreadsheet");
    
    // Get form type and generate ID
    const formType = data.formType || "unknown";
    const timestamp = new Date();
    const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
    
    // Get or create the appropriate sheet based on form type
    let sheetName;
    switch (formType) {
      case "contact":
        sheetName = "Contact Enquiries";
        break;
      case "room":
        sheetName = "Room Bookings";
        break;
      case "banquet":
        sheetName = "Banquet Bookings";
        break;
      default:
        sheetName = "Other Submissions";
    }
    
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      setupSheetHeaders(sheet, formType);
      result.steps.push("Created new sheet: " + sheetName);
    }
    
    // Prepare row data based on form type
    let rowData;
    if (formType === "contact") {
      rowData = [
        id,                                    // ID
        timestamp,                             // Timestamp
        data.name || "No Name",                // Name
        data.email || "No Email",              // Email
        data.mobile || "No Contact",           // Contact Number
        data.enquiryType || "Not specified",   // Enquiry Type
        data.message || "None",                // Message
        JSON.stringify(data)                   // Raw Data
      ];
    } 
    else if (formType === "room") {
      rowData = [
        id,                                    // ID
        timestamp,                             // Timestamp
        data.name || "No Name",                // Name
        data.email || "No Email",              // Email
        data.contactNo || "No Contact",        // Contact Number
        data.roomType || "Not specified",      // Room Type
        data.guests || "Not specified",        // No of guests
        data.kids || "0",                      // No of kids
        data.checkInDate || "Not specified",   // Check-in Date
        data.checkOutDate || "Not specified",  // Check-out Date
        data.specialRequirements || "None",    // Special Requests
        JSON.stringify(data)                   // Raw Data
      ];
    } 
    else if (formType === "banquet") {
      rowData = [
        id,                                    // ID
        timestamp,                             // Timestamp
        data.name || "No Name",                // Name
        data.email || "No Email",              // Email
        data.contactNo || "No Contact",        // Contact Number
        data.eventType || "Not specified",     // Event Type
        data.fromDate || "Not specified",      // Event Start Date
        data.toDate || "Not specified",        // Event End Date
        data.guests || "Not specified",        // Number of Guests
        data.specialRequests || "None",        // Special Requests
        JSON.stringify(data)                   // Raw Data
      ];
    } 
    else {
      // Generic fallback for unknown form types
      rowData = [
        id,                                    // ID
        timestamp,                             // Timestamp
        formType,                              // Form Type
        data.name || "No Name",                // Name
        data.email || "No Email",              // Email
        data.mobile || data.contactNo || "No Contact", // Contact
        JSON.stringify(data)                   // Raw Data
      ];
    }
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    result.steps.push("Row appended to sheet: " + sheetName + " with ID: " + id);
    
    // Also add to the main "All Enquiries" sheet for reference
    let allSheet = ss.getSheetByName(SHEET_NAME);
    if (!allSheet) {
      allSheet = ss.insertSheet(SHEET_NAME);
      setupAllEnquiriesHeaders(allSheet);
      result.steps.push("Created All Enquiries sheet");
    }
    
    // Add to the main sheet with form type indicator
    const mainRowData = [
      id,                                    // ID
      timestamp,                             // Timestamp
      formType,                              // Form Type
      data.name || "No Name",                // Name
      data.email || "No Email",              // Email
      data.mobile || data.contactNo || "No Contact", // Contact Number
      sheetName,                             // Sheet Reference
      JSON.stringify(data)                   // Raw Data
    ];
    
    allSheet.appendRow(mainRowData);
    result.steps.push("Row also added to All Enquiries sheet");
    
    // Return success response
    result.success = true;
    result.message = "Entry recorded successfully";
    result.id = id;
    result.sheetName = sheetName;
    
  } catch (error) {
    result.steps.push("ERROR: " + error.message);
    result.message = "Error: " + error.message;
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const result = {
    success: true,
    message: "Google Apps Script is running",
    sheetId: SHEET_ID,
    sheets: []
  };
  
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.spreadsheetName = ss.getName();
    
    // List all sheets
    const sheets = ss.getSheets();
    sheets.forEach(sheet => {
      result.sheets.push({
        name: sheet.getName(),
        rowCount: sheet.getLastRow(),
        columnCount: sheet.getLastColumn()
      });
    });
  } catch (error) {
    result.success = false;
    result.message = "Error: " + error.message;
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupSheetHeaders(sheet, formType) {
  let headers;
  
  if (formType === "contact") {
    headers = [
      "ID", 
      "Timestamp", 
      "Name", 
      "Email", 
      "Contact Number", 
      "Enquiry Type", 
      "Message",
      "Raw Data"
    ];
  } 
  else if (formType === "room") {
    headers = [
      "ID", 
      "Timestamp", 
      "Name", 
      "Email", 
      "Contact Number", 
      "Room Type", 
      "No of guests", 
      "No of kids", 
      "Check-in Date", 
      "Check-out Date", 
      "Special Requests",
      "Raw Data"
    ];
  } 
  else if (formType === "banquet") {
    headers = [
      "ID", 
      "Timestamp", 
      "Name", 
      "Email", 
      "Contact Number", 
      "Event Type", 
      "Event Start Date", 
      "Event End Date", 
      "Number of Guests", 
      "Special Requests",
      "Raw Data"
    ];
  } 
  else {
    // Generic headers for unknown form types
    headers = [
      "ID", 
      "Timestamp", 
      "Form Type", 
      "Name", 
      "Email", 
      "Contact",
      "Raw Data"
    ];
  }
  
  // Apply headers to the sheet
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Apply formatting
  sheet.getRange(1, 1, 1, headers.length).setBackground("#4285F4").setFontColor("white");
  
  // Make the raw data column wider
  sheet.setColumnWidth(headers.length, 300);
}

function setupAllEnquiriesHeaders(sheet) {
  const headers = [
    "ID", 
    "Timestamp", 
    "Form Type", 
    "Name", 
    "Email", 
    "Contact Number", 
    "Sheet Reference",
    "Raw Data"
  ];
  
  // Apply headers to the sheet
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Apply formatting
  sheet.getRange(1, 1, 1, headers.length).setBackground("#4285F4").setFontColor("white");
  
  // Make the raw data column wider
  sheet.setColumnWidth(headers.length, 300);
}
