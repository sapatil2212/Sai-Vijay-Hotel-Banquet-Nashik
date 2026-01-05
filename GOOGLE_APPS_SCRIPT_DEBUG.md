# Debug Google Apps Script - Test Data Reception

Deploy this temporary script to verify data is being received correctly:

```javascript
const SHEET_ID = "1lNrTuHeM2qdfufHAn1LLRQ6c3ytL7DnY1wIdMyQ-KtU";

function doPost(e) {
  const result = {
    success: false,
    message: "Processing request...",
    receivedData: {},
    steps: []
  };
  
  try {
    result.steps.push("Received POST request");
    
    // Parse the incoming JSON data
    const jsonString = e.postData.contents;
    let data;
    try {
      data = JSON.parse(jsonString);
      result.receivedData = data;
      result.steps.push("Data parsed successfully");
    } catch (parseError) {
      throw new Error("Invalid JSON: " + parseError.message);
    }
    
    // Log what we received
    Logger.log("Received data: " + JSON.stringify(data, null, 2));
    Logger.log("Room Type: " + data.roomType);
    Logger.log("Occupancy Type: " + data.occupancyType);
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    result.steps.push("Opened spreadsheet");
    
    // Get or create the Contact Form Data sheet
    let sheet = ss.getSheetByName("Contact Form Data");
    if (!sheet) {
      sheet = ss.insertSheet("Contact Form Data");
      // Create headers with correct order
      const headers = [
        "ID", 
        "Timestamp", 
        "Name", 
        "Email", 
        "Contact Number", 
        "Enquiry Type", 
        "Event Type",
        "Room Type",
        "Occupancy Type",
        "Message"
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.getRange(1, 1, 1, headers.length).setBackground("#4285F4");
      sheet.getRange(1, 1, 1, headers.length).setFontColor("white");
      sheet.setFrozenRows(1);
      result.steps.push("Created new sheet with headers");
    }
    
    // Generate ID and timestamp
    const timestamp = new Date();
    const id = "ENQ-" + timestamp.getTime() + "-" + Math.floor(Math.random() * 10000);
    
    // Prepare row data in exact column order
    const rowData = [
      id,                                                                    // Column A: ID
      Utilities.formatDate(timestamp, "GMT+5:30", "yyyy-MM-dd HH:mm:ss"),  // Column B: Timestamp
      data.name || "",                                                      // Column C: Name
      data.email || "",                                                     // Column D: Email
      data.mobile || "",                                                    // Column E: Contact Number
      data.enquiryType || "",                                               // Column F: Enquiry Type
      data.eventType || "",                                                 // Column G: Event Type
      data.roomType || "",                                                  // Column H: Room Type
      data.occupancyType || "",                                             // Column I: Occupancy Type
      data.message || ""                                                    // Column J: Message
    ];
    
    // Log the row data
    Logger.log("Row data to write: " + JSON.stringify(rowData));
    
    // Write to sheet
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    result.steps.push("Data written to row " + (lastRow + 1));
    result.steps.push("Room Type value: " + (data.roomType || "EMPTY"));
    result.steps.push("Occupancy Type value: " + (data.occupancyType || "EMPTY"));
    result.success = true;
    result.message = "Entry recorded successfully with ID: " + id;
    result.id = id;
    
  } catch (error) {
    result.steps.push("ERROR: " + error.message);
    result.message = "Error: " + error.message;
    Logger.log("Error: " + error.message);
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running",
    sheetId: SHEET_ID
  })).setMimeType(ContentService.MimeType.JSON);
}
```

## Instructions:

1. **Deploy this debug script temporarily**:
   - Go to https://script.google.com
   - Replace your current script with this debug version
   - Save and deploy as Web App
   - Copy the new deployment URL if it changes

2. **Update .env if URL changed**:
   ```
   GOOGLE_SHEET_DEPLOY_URL="your-new-deployment-url"
   ```

3. **Test the form**:
   - Submit a contact form with:
     - Enquiry Type: Rooms
     - Room Type: Deluxe Room
     - Occupancy Type: Double
   
4. **Check the response**:
   - The script will return detailed information about what data it received
   - Check the Google Apps Script logs (View → Logs) to see what was received

5. **Check the sheet**:
   - The script will create a fresh "Contact Form Data" sheet with correct headers
   - Data should appear in the correct columns

This debug script will help us identify if:
- The data is reaching Google Apps Script correctly
- The columns are being written to the correct positions
- There's any data transformation issue
