# Google Apps Script - Fixed for Existing Column Structure

This script works with your existing sheet that has the "Room Type/Event Type" column.

```javascript
/**
 * Google Apps Script for form handling with existing column structure
 * Deploy as: Web App > Execute as: Me > Access: Anyone
 */

const SHEET_ID = "1lNrTuHeM2qdfufHAn1LLRQ6c3ytL7DnY1wIdMyQ-KtU";

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
    
    // Log received data for debugging
    Logger.log("Received data: " + JSON.stringify(data, null, 2));
    Logger.log("Room Type: " + data.roomType);
    Logger.log("Occupancy Type: " + data.occupancyType);
    Logger.log("Event Type: " + data.eventType);
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.steps.push("Opened spreadsheet");
    
    // Get form type
    const formType = data.formType || "unknown";
    const timestamp = new Date();
    const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
    
    // Determine which sheet to use based on form type
    let sheetName;
    switch (formType) {
      case "contact":
        sheetName = "Contact Form Data";
        break;
      case "room":
        sheetName = "Room Booking Data";
        break;
      case "banquet":
        sheetName = "Banquet Booking Data";
        break;
      default:
        sheetName = "Other Form Data";
    }
    
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      createAndFormatHeaders(sheet, formType);
      result.steps.push("Created new sheet: " + sheetName);
    }
    
    // Process the data according to the form type
    processFormData(sheet, data, formType, id, timestamp);
    
    result.steps.push("Data added to " + sheetName + " sheet with ID: " + id);
    result.steps.push("Room Type written: " + (data.roomType || "EMPTY"));
    result.steps.push("Occupancy Type written: " + (data.occupancyType || "EMPTY"));
    result.success = true;
    result.message = "Entry recorded successfully";
    result.id = id;
    
  } catch (error) {
    result.steps.push("ERROR: " + error.message);
    result.message = "Error: " + error.message;
    Logger.log("Error: " + error.message);
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function processFormData(sheet, data, formType, id, timestamp) {
  let rowData;
  const lastRow = sheet.getLastRow();
  
  // Format dates properly if they exist
  let formattedDates = formatDates(data);
  
  if (formType === "contact") {
    // For contact form with existing column structure:
    // A: ID
    // B: Timestamp
    // C: Name
    // D: Email
    // E: Contact Number
    // F: Enquiry Type
    // G: Room Type/Event Type (combined column - we'll use eventType here)
    // H: Room Type
    // I: Occupancy Type
    // J: Message
    
    rowData = [
      id,                                                                    // A: ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"),  // B: Timestamp
      data.name || "",                                                      // C: Name
      data.email || "",                                                     // D: Email
      data.mobile || "",                                                    // E: Contact Number
      data.enquiryType || "",                                               // F: Enquiry Type
      data.eventType || "",                                                 // G: Room Type/Event Type (for backward compatibility)
      data.roomType || "",                                                  // H: Room Type
      data.occupancyType || "",                                             // I: Occupancy Type
      data.message || ""                                                    // J: Message
    ];
    
    Logger.log("Writing contact form data: " + JSON.stringify(rowData));
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  } 
  else if (formType === "room") {
    rowData = [
      id,                                                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"),  // Timestamp
      data.name || "",                                                      // Name
      data.email || "",                                                     // Email
      data.contactNo || "",                                                 // Contact Number
      data.roomType || "",                                                  // Room Type
      data.guests || "",                                                    // No of guests
      data.kids || "",                                                      // No of kids
      formattedDates.checkInDate || "",                                     // Check-in Date
      formattedDates.checkOutDate || "",                                    // Check-out Date
      data.specialRequirements || ""                                        // Special Requests
    ];
    
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  } 
  else if (formType === "banquet") {
    rowData = [
      id,                                                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"),  // Timestamp
      data.name || "",                                                      // Name
      data.email || "",                                                     // Email
      data.contactNo || "",                                                 // Contact Number
      data.eventType || "",                                                 // Event Type
      formattedDates.fromDate || "",                                        // Event Start Date
      formattedDates.toDate || "",                                          // Event End Date
      data.guests || "",                                                    // Number of Guests
      data.specialRequests || ""                                            // Special Requests
    ];
    
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  } 
  else {
    // Generic fallback for unknown form types
    rowData = [
      id,                                                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"),  // Timestamp
      formType,                                                             // Form Type
      data.name || "",                                                      // Name
      data.email || "",                                                     // Email
      data.mobile || data.contactNo || ""                                   // Contact
    ];
    
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  }
}

function formatDates(data) {
  let result = {};
  const dateFormat = "yyyy-MM-dd";
  const timeZone = "GMT+5:30"; // Indian Standard Time
  
  try {
    // Try to parse and format dates
    if (data.checkInDate) {
      const checkInDate = new Date(data.checkInDate);
      if (!isNaN(checkInDate.getTime())) {
        result.checkInDate = Utilities.formatDate(checkInDate, timeZone, dateFormat);
      } else {
        result.checkInDate = data.checkInDate;
      }
    }
    
    if (data.checkOutDate) {
      const checkOutDate = new Date(data.checkOutDate);
      if (!isNaN(checkOutDate.getTime())) {
        result.checkOutDate = Utilities.formatDate(checkOutDate, timeZone, dateFormat);
      } else {
        result.checkOutDate = data.checkOutDate;
      }
    }
    
    if (data.fromDate) {
      const fromDate = new Date(data.fromDate);
      if (!isNaN(fromDate.getTime())) {
        result.fromDate = Utilities.formatDate(fromDate, timeZone, dateFormat);
      } else {
        result.fromDate = data.fromDate;
      }
    }
    
    if (data.toDate) {
      const toDate = new Date(data.toDate);
      if (!isNaN(toDate.getTime())) {
        result.toDate = Utilities.formatDate(toDate, timeZone, dateFormat);
      } else {
        result.toDate = data.toDate;
      }
    }
  } catch (e) {
    Logger.log("Error formatting dates: " + e);
  }
  
  return result;
}

function createAndFormatHeaders(sheet, formType) {
  let headers;
  
  if (formType === "contact") {
    // Match your existing column structure
    headers = [
      "ID", 
      "Timestamp", 
      "Name", 
      "Email", 
      "Contact Number", 
      "Enquiry Type", 
      "Room Type/Event Type",  // Keep this for backward compatibility
      "Room Type",
      "Occupancy Type",
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
  
  // Apply headers and formatting
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  
  // Apply better formatting
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#4285F4").setFontColor("white");
  headerRange.setHorizontalAlignment("center");
  
  // Set appropriate column widths
  sheet.setColumnWidth(1, 200);  // ID
  sheet.setColumnWidth(2, 180);  // Timestamp
  
  // Set specific column widths based on form type
  if (formType === "contact") {
    sheet.setColumnWidth(5, 140);  // Contact Number
    sheet.setColumnWidth(6, 140);  // Enquiry Type
    sheet.setColumnWidth(7, 140);  // Room Type/Event Type
    sheet.setColumnWidth(8, 140);  // Room Type
    sheet.setColumnWidth(9, 140);  // Occupancy Type
    sheet.setColumnWidth(10, 300); // Message
  }
  else if (formType === "room") {
    sheet.setColumnWidth(5, 140);  // Contact Number
    sheet.setColumnWidth(6, 180);  // Room Type
    sheet.setColumnWidth(9, 120);  // Check-in Date
    sheet.setColumnWidth(10, 120); // Check-out Date
    sheet.setColumnWidth(11, 250); // Special Requests
  } 
  else if (formType === "banquet") {
    sheet.setColumnWidth(5, 140);  // Contact Number
    sheet.setColumnWidth(6, 150);  // Event Type
    sheet.setColumnWidth(7, 120);  // Event Start Date
    sheet.setColumnWidth(8, 120);  // Event End Date
    sheet.setColumnWidth(10, 250); // Special Requests
  }
  
  // Auto-resize remaining columns
  for (let i = 1; i <= headers.length; i++) {
    if (!isColumnSizedAlready(i, formType)) {
      sheet.autoResizeColumn(i);
    }
  }
}

function isColumnSizedAlready(columnIndex, formType) {
  // Columns we've explicitly sized based on form type
  if (columnIndex === 1 || columnIndex === 2) return true; // ID and Timestamp for all forms
  
  if (formType === "contact") {
    return [5, 6, 7, 8, 9, 10].includes(columnIndex);
  }
  else if (formType === "room") {
    return [5, 6, 9, 10, 11].includes(columnIndex);
  } 
  else if (formType === "banquet") {
    return [5, 6, 7, 8, 10].includes(columnIndex);
  }
  
  return false;
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running",
    sheetId: SHEET_ID
  })).setMimeType(ContentService.MimeType.JSON);
}
```

## Key Changes:

1. **Matches Your Existing Column Structure**: The script now writes data to match your current sheet layout with the "Room Type/Event Type" column at position G.

2. **Column Mapping for Contact Form**:
   - A: ID
   - B: Timestamp
   - C: Name
   - D: Email
   - E: Contact Number
   - F: Enquiry Type
   - G: Room Type/Event Type (keeps eventType for backward compatibility)
   - H: Room Type (NEW - will now be populated)
   - I: Occupancy Type (NEW - will now be populated)
   - J: Message

3. **Enhanced Logging**: Added detailed logging to track what data is being written to each column.

4. **Preserves All Three Form Types**: Works with contact, room booking, and banquet forms.

## Deployment Instructions:

1. Go to https://script.google.com
2. Open your form handler project
3. Replace the entire script with this code
4. Click **Save** (Ctrl+S)
5. Click **Deploy** → **Manage deployments**
6. Click the **Edit** icon (pencil) on your existing deployment
7. Under "New description", add: "Fixed column structure for Room Type and Occupancy Type"
8. Click **Deploy**
9. The URL should remain the same (no need to update .env)

## Test:

After deploying, submit a contact form with:
- Enquiry Type: Rooms
- Room Type: Deluxe Room
- Occupancy Type: Double

The data should now appear in columns H and I of your existing sheet!
