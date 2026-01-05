/**
 * Google Apps Script for form handling
 * Deploy as: Web App > Execute as: Me > Access: Anyone
 */

const SHEET_ID = "1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE";

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
    
    // Get form type
    const formType = data.formType || "unknown";
    const timestamp = new Date();
    const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
    
    // Get or create the appropriate sheet based on form type
    let sheetName;
    switch (formType) {
      case "contact":
        sheetName = "Contact Forms";
        break;
      case "room":
        sheetName = "Room Bookings";
        break;
      case "banquet":
        sheetName = "Banquet Bookings";
        break;
      default:
        sheetName = "Other Forms";
    }
    
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      setupHeaders(sheet, formType);
      result.steps.push("Created new sheet: " + sheetName);
    }
    
    // Add the data to the appropriate sheet
    const rowData = createRowData(data, formType, id, timestamp);
    sheet.appendRow(rowData);
    
    result.steps.push("Data added to " + sheetName + " sheet with ID: " + id);
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

function createRowData(data, formType, id, timestamp) {
  if (formType === "contact") {
    return [
      id,                                    // ID
      timestamp,                             // Timestamp
      data.name || "No Name",                // Name
      data.email || "No Email",              // Email
      data.mobile || "No Contact",           // Contact Number
      data.enquiryType || "Not specified",   // Enquiry Type
      data.message || "None"                 // Message
    ];
  } 
  else if (formType === "room") {
    return [
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
      data.specialRequirements || "None"     // Special Requests
    ];
  } 
  else if (formType === "banquet") {
    return [
      id,                                    // ID
      timestamp,                             // Timestamp
      data.name || "No Name",                // Name
      data.email || "No Email",              // Email
      data.contactNo || "No Contact",        // Contact Number
      data.eventType || "Not specified",     // Event Type
      data.fromDate || "Not specified",      // Event Start Date
      data.toDate || "Not specified",        // Event End Date
      data.guests || "Not specified",        // Number of Guests
      data.specialRequests || "None"         // Special Requests
    ];
  } 
  else {
    // Generic fallback for unknown form types
    return [
      id,                                    // ID
      timestamp,                             // Timestamp
      formType,                              // Form Type
      data.name || "No Name",                // Name
      data.email || "No Email",              // Email
      data.mobile || data.contactNo || "No Contact" // Contact
    ];
  }
}

function setupHeaders(sheet, formType) {
  let headers;
  
  if (formType === "contact") {
    headers = [
      "ID", 
      "Timestamp", 
      "Name", 
      "Email", 
      "Contact Number", 
      "Enquiry Type", 
      "Message"
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
      "Special Requests"
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
      "Special Requests"
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
      "Contact"
    ];
  }
  
  // Apply headers to the sheet
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Apply formatting
  sheet.getRange(1, 1, 1, headers.length).setBackground("#4285F4").setFontColor("white");
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running",
    sheetId: SHEET_ID
  })).setMimeType(ContentService.MimeType.JSON);
}
