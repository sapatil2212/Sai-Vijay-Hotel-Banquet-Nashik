/**
 * Google Apps Script for form handling
 * Deploy as: Web App > Execute as: Me > Access: Anyone
 */

const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";
const SHEET_NAME = "All Enquiries";

// Define column indices for better readability and maintenance
const COL = {
  ID: 0,
  TIMESTAMP: 1,
  FORM_TYPE: 2,
  NAME: 3,
  EMAIL: 4,
  CONTACT: 5,
  ROOM_TYPE: 6,
  ROOM_GUESTS: 7,
  KIDS: 8,
  CHECKIN_DATE: 9,
  CHECKOUT_DATE: 10,
  EVENT_TYPE: 11,
  EVENT_START: 12,
  EVENT_END: 13,
  ENQUIRY_TYPE: 14,
  EVENT_GUESTS: 15,
  SPECIAL_REQUESTS: 16,
  MESSAGE: 17,
  IP_ADDRESS: 18,
  USER_AGENT: 19,
  RAW_DATA: 20
};

function doPost(e) {
  const result = {
    success: false,
    message: "Processing request...",
    steps: []
  };
  
  try {
    result.steps.push("Received POST request");
    
    const jsonString = e.postData.contents;
    let data;
    try {
      data = JSON.parse(jsonString);
      result.steps.push("Data parsed successfully");
    } catch (parseError) {
      throw new Error("Invalid JSON: " + parseError.message);
    }
    
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.steps.push("Opened spreadsheet");
    
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupBasicHeaders(sheet);
      result.steps.push("Created new sheet");
    }
    
    const timestamp = new Date();
    const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
    const formType = data.formType || "unknown";
    
    // Create an array with enough cells for all columns (including raw data)
    let rowData = Array(COL.RAW_DATA + 1).fill("");
    
    // Common fields for all form types
    rowData[COL.ID] = id;
    rowData[COL.TIMESTAMP] = timestamp;
    rowData[COL.FORM_TYPE] = formType;
    rowData[COL.NAME] = data.name || "No Name";
    rowData[COL.EMAIL] = data.email || "No Email";
    rowData[COL.CONTACT] = data.mobile || data.contactNo || "No Contact";
    
    // Process form data based on form type
    if (formType === "contact") {
      // Contact form fields
      rowData[COL.ENQUIRY_TYPE] = data.enquiryType || "Not specified";
      rowData[COL.MESSAGE] = data.message || "None";
      
    } else if (formType === "room") {
      // Room booking fields
      rowData[COL.ROOM_TYPE] = data.roomType || "Not specified";
      rowData[COL.ROOM_GUESTS] = data.guests || "Not specified";
      rowData[COL.KIDS] = data.kids || "0";
      rowData[COL.CHECKIN_DATE] = data.checkInDate || "Not specified";
      rowData[COL.CHECKOUT_DATE] = data.checkOutDate || "Not specified";
      rowData[COL.SPECIAL_REQUESTS] = data.specialRequirements || "None";
      
    } else if (formType === "banquet") {
      // Banquet booking fields
      rowData[COL.EVENT_TYPE] = data.eventType || "Not specified";
      rowData[COL.EVENT_START] = data.fromDate || "Not specified";
      rowData[COL.EVENT_END] = data.toDate || "Not specified";
      rowData[COL.EVENT_GUESTS] = data.guests || "Not specified";
      rowData[COL.SPECIAL_REQUESTS] = data.specialRequests || "None";
    }
    
    // Add raw JSON data as the last column
    rowData[COL.RAW_DATA] = JSON.stringify(data);
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    result.steps.push("Row appended with ID: " + id);
    
    result.success = true;
    result.message = "Entry recorded successfully";
    result.id = id;
    
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
    sheetName: SHEET_NAME
  };
  
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.spreadsheetName = ss.getName();
    const sheet = ss.getSheetByName(SHEET_NAME);
    result.sheetExists = !!sheet;
    if (sheet) result.rowCount = sheet.getLastRow();
  } catch (error) {
    result.success = false;
    result.message = "Error: " + error.message;
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupBasicHeaders(sheet) {
  // Create headers array with exact length matching our column constants
  const headers = Array(COL.RAW_DATA + 1).fill("");
  
  // Assign each header to its proper column index
  headers[COL.ID] = "ID";
  headers[COL.TIMESTAMP] = "Timestamp";
  headers[COL.FORM_TYPE] = "Form Type";
  headers[COL.NAME] = "Name";
  headers[COL.EMAIL] = "Email";
  headers[COL.CONTACT] = "Contact Number";
  headers[COL.ROOM_TYPE] = "Room Type";
  headers[COL.ROOM_GUESTS] = "No of guests (Room)";
  headers[COL.KIDS] = "No of kids";
  headers[COL.CHECKIN_DATE] = "Check-in Date";
  headers[COL.CHECKOUT_DATE] = "Check-out Date";
  headers[COL.EVENT_TYPE] = "Event Type";
  headers[COL.EVENT_START] = "Event Start Date";
  headers[COL.EVENT_END] = "Event End Date";
  headers[COL.ENQUIRY_TYPE] = "Enquiry Type";
  headers[COL.EVENT_GUESTS] = "Number of Guests (Event)";
  headers[COL.SPECIAL_REQUESTS] = "Special Requests";
  headers[COL.MESSAGE] = "Message";
  headers[COL.IP_ADDRESS] = "IP Address";
  headers[COL.USER_AGENT] = "User Agent";
  headers[COL.RAW_DATA] = "Raw Data";
  
  // Apply headers to the sheet
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Apply some basic formatting
  sheet.getRange(1, 1, 1, headers.length).setBackground("#4285F4").setFontColor("white");
  sheet.setColumnWidth(COL.RAW_DATA + 1, 300); // Make the raw data column wider
}
