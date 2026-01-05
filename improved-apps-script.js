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
    
    // Format the data properly before adding to sheet
    const rowData = createRowData(data, formType, id, timestamp);
    
    // Use setValues instead of appendRow for better control
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    // Format date cells
    if (formType === "room") {
      // Format check-in and check-out dates
      sheet.getRange(lastRow + 1, 9).setNumberFormat("yyyy-MM-dd");
      sheet.getRange(lastRow + 1, 10).setNumberFormat("yyyy-MM-dd");
    } else if (formType === "banquet") {
      // Format event start and end dates
      sheet.getRange(lastRow + 1, 7).setNumberFormat("yyyy-MM-dd");
      sheet.getRange(lastRow + 1, 8).setNumberFormat("yyyy-MM-dd");
    }
    
    // Format timestamp
    sheet.getRange(lastRow + 1, 2).setNumberFormat("yyyy-MM-dd HH:mm:ss");
    
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
  // Format dates properly
  let checkInDate, checkOutDate, fromDate, toDate;
  
  try {
    // Try to parse dates if they exist
    if (data.checkInDate) {
      checkInDate = new Date(data.checkInDate);
    }
    if (data.checkOutDate) {
      checkOutDate = new Date(data.checkOutDate);
    }
    if (data.fromDate) {
      fromDate = new Date(data.fromDate);
    }
    if (data.toDate) {
      toDate = new Date(data.toDate);
    }
  } catch (e) {
    // If date parsing fails, we'll use the original string values
  }
  
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
      checkInDate || data.checkInDate || "Not specified",   // Check-in Date
      checkOutDate || data.checkOutDate || "Not specified", // Check-out Date
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
      fromDate || data.fromDate || "Not specified",      // Event Start Date
      toDate || data.toDate || "Not specified",          // Event End Date
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
  
  // Set column widths for better readability
  sheet.setColumnWidth(1, 150);  // ID
  sheet.setColumnWidth(2, 180);  // Timestamp
  
  if (formType === "room" || formType === "banquet") {
    // Set date column widths
    if (formType === "room") {
      sheet.setColumnWidth(9, 120);  // Check-in Date
      sheet.setColumnWidth(10, 120); // Check-out Date
    } else {
      sheet.setColumnWidth(7, 120);  // Event Start Date
      sheet.setColumnWidth(8, 120);  // Event End Date
    }
  }
  
  // Apply formatting
  sheet.getRange(1, 1, 1, headers.length).setBackground("#4285F4").setFontColor("white");
  
  // Auto-resize remaining columns
  for (let i = 1; i <= headers.length; i++) {
    if (![1, 2, 7, 8, 9, 10].includes(i)) { // Skip columns we've already sized
      sheet.autoResizeColumn(i);
    }
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running",
    sheetId: SHEET_ID
  })).setMimeType(ContentService.MimeType.JSON);
}
