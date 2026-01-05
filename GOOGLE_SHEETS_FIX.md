# Google Sheets Integration Fix

## Issue Identified
The form submissions are successfully reaching the Google Apps Script (as evidenced by the successful response), but the data isn't being written to the Google Sheet due to permission issues.

## Solution Steps

### 1. Update the Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/) and open the script associated with your web app URL
2. Replace the current code with the enhanced version provided in `enhanced-google-apps-script.js`
3. Save the script

### 2. Fix Permissions

1. In the Google Apps Script editor, click on **Deploy** > **New deployment**
2. Select **Web app** as the deployment type
3. Set the following settings:
   - **Execute as**: `Me` (the account that owns the script)
   - **Who has access**: `Anyone` (even anonymous)
4. Click **Deploy** and authorize the script when prompted
5. Copy the new Web App URL provided after deployment

### 3. Update the Sheet Permissions

1. Open the Google Sheet directly at [https://docs.google.com/spreadsheets/d/1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE/](https://docs.google.com/spreadsheets/d/1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE/)
2. Click **Share** in the top-right corner
3. Add the email address of the Google account running the Apps Script with Editor permissions
4. Make sure the sheet contains a tab named "All Enquiries" (create it if it doesn't exist)

### 4. Update Your .env File

Update your `.env` file with the new Web App URL:

```
WEB-APP-SHEET-URL="[New Web App URL from step 2]"
```

### 5. Test the Integration

Run the test script to verify the fix:

```
node test-sheet-integration.js
```

## Common Issues and Solutions

### If the script still returns success but no data appears:

1. Check the script logs in the Google Apps Script editor:
   - Click on **Executions** in the left sidebar
   - Look for any error messages in recent executions

2. Verify the sheet name exactly matches "All Enquiries" (case-sensitive)

3. Try running the script with explicit authorization:
   - In the Apps Script editor, click **Run** > **Run function** > **doGet**
   - Grant any permissions requested

### If you get CORS errors:

Add the following to your Google Apps Script at the top of both `doGet` and `doPost` functions:

```javascript
function setCorsHeaders(response) {
  return response
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Then in doGet and doPost:
if (e.method === 'OPTIONS') {
  return setCorsHeaders(ContentService.createTextOutput(''));
}
```

## Debugging Tips

If you need to debug the integration further:

1. Check the Apps Script execution logs:
   - In the Apps Script editor, click **View** > **Logs**
   - Run a test submission and check for errors

2. Verify the Google Sheet ID is correct:
   - The ID is the part of the URL between `/d/` and `/edit`
   - Current ID: `1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE`

3. Test with the simplest possible data structure:
   - Use the `test-simple-submission.js` script provided
