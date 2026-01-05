# Updated Google Apps Script Code

Replace your current Google Apps Script code with the following updated version that properly handles the event type field in contact forms:

```javascript
/**
 * Google Apps Script for form handling with perfect data alignment
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
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.steps.push("Opened spreadsheet");
    
    // Get form type
    const formType = data.formType || "unknown";
    const timestamp = new Date();
    const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
    
    // Use a completely separate sheet for each form type
    // This ensures perfect alignment with form-specific columns
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

function processFormData(sheet, data, formType, id, timestamp) {
  let rowData;
  const lastRow = sheet.getLastRow();
  
  // Format dates properly if they exist
  let formattedDates = formatDates(data);
  
  if (formType === "contact") {
    rowData = [
      id,                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"), // Timestamp
      data.name || "",                       // Name
      data.email || "",                      // Email
      data.mobile || "",                     // Contact Number
      data.enquiryType || "",                // Enquiry Type
      data.eventType || "",                  // Event Type - Added this field
      data.message || ""                     // Message
    ];
    
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  } 
  else if (formType === "room") {
    rowData = [
      id,                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"), // Timestamp
      data.name || "",                       // Name
      data.email || "",                      // Email
      data.contactNo || "",                  // Contact Number
      data.roomType || "",                   // Room Type
      data.guests || "",                     // No of guests
      data.kids || "",                       // No of kids
      formattedDates.checkInDate || "",      // Check-in Date
      formattedDates.checkOutDate || "",     // Check-out Date
      data.specialRequirements || ""         // Special Requests
    ];
    
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  } 
  else if (formType === "banquet") {
    rowData = [
      id,                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"), // Timestamp
      data.name || "",                       // Name
      data.email || "",                      // Email
      data.contactNo || "",                  // Contact Number
      data.eventType || "",                  // Event Type
      formattedDates.fromDate || "",         // Event Start Date
      formattedDates.toDate || "",           // Event End Date
      data.guests || "",                     // Number of Guests
      data.specialRequests || ""             // Special Requests
    ];
    
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  } 
  else {
    // Generic fallback for unknown form types
    rowData = [
      id,                                    // ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"), // Timestamp
      formType,                              // Form Type
      data.name || "",                       // Name
      data.email || "",                      // Email
      data.mobile || data.contactNo || ""    // Contact
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
    console.error("Error formatting dates:", e);
  }
  
  return result;
}

function createAndFormatHeaders(sheet, formType) {
  let headers;
  
  if (formType === "contact") {
    headers = [
      "ID", 
      "Timestamp", 
      "Name", 
      "Email", 
      "Contact Number", 
      "Enquiry Type", 
      "Event Type",  // Added this field
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
  if (formType === "room") {
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
  else if (formType === "contact") {
    sheet.setColumnWidth(5, 140);  // Contact Number
    sheet.setColumnWidth(6, 140);  // Enquiry Type
    sheet.setColumnWidth(7, 140);  // Event Type
    sheet.setColumnWidth(8, 300);  // Message
  }
  
  // Auto-resize remaining columns
  for (let i = 1; i <= headers.length; i++) {
    // Skip columns we've already explicitly sized
    if (!isColumnSizedAlready(i, formType)) {
      sheet.autoResizeColumn(i);
    }
  }
}

function isColumnSizedAlready(columnIndex, formType) {
  // Columns we've explicitly sized based on form type
  if (columnIndex === 1 || columnIndex === 2) return true; // ID and Timestamp for all forms
  
  if (formType === "room") {
    return [5, 6, 9, 10, 11].includes(columnIndex);
  } 
  else if (formType === "banquet") {
    return [5, 6, 7, 8, 10].includes(columnIndex);
  }
  else if (formType === "contact") {
    return [5, 6, 7, 8].includes(columnIndex);
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

## Key Changes Made:

1. Added `eventType` field to the contact form data processing:
   ```javascript
   if (formType === "contact") {
     rowData = [
       // ...other fields
       data.eventType || "",  // Event Type - Added this field
       data.message || ""     // Message
     ];
   }
   ```

2. Added `Event Type` to the contact form headers:
   ```javascript
   if (formType === "contact") {
     headers = [
       // ...other headers
       "Event Type",  // Added this field
       "Message"
     ];
   }
   ```

3. Added column width configuration for the Event Type field:
   ```javascript
   else if (formType === "contact") {
     sheet.setColumnWidth(5, 140);  // Contact Number
     sheet.setColumnWidth(6, 140);  // Enquiry Type
     sheet.setColumnWidth(7, 140);  // Event Type
     sheet.setColumnWidth(8, 300);  // Message
   }
   ```

4. Updated the column sizing check:
   ```javascript
   else if (formType === "contact") {
     return [5, 6, 7, 8].includes(columnIndex);
   }
   ```

## Implementation Instructions:

1. Go to your Google Apps Script project
2. Replace the entire script with this updated version
3. Save the script
4. Deploy it as a new version
5. Test the form submission to verify the event type field is now being collected
