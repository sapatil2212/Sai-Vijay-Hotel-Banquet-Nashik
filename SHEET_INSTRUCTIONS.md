# Google Sheet Integration Instructions

## How to View Your Form Submissions

Your form submissions are being successfully recorded in your Google Sheet. Based on our tests, the data is being written to a tab named **"All Enquiries"** within your Google Sheet.

### Steps to View Your Data:

1. Open your Google Sheet directly using this link:
   [https://docs.google.com/spreadsheets/d/1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE/](https://docs.google.com/spreadsheets/d/1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE/)

2. Look for the tab named **"All Enquiries"** at the bottom of the sheet.
   - If this tab doesn't exist, you'll need to create it manually with this exact name (case-sensitive).

3. Make sure you have proper permissions:
   - The Google account running the Apps Script must have edit access to this sheet.
   - If you're not seeing data, share the sheet with the email address that deployed the Apps Script.

## Troubleshooting

If you're still not seeing data in the "All Enquiries" tab:

1. **Check for filters**: Look for any active filters that might be hiding rows.

2. **Refresh the page**: Sometimes Google Sheets doesn't automatically refresh.

3. **Check other tabs**: The data might be going to a different tab.

4. **Verify the sheet ID**: Confirm you're looking at the correct Google Sheet with ID `1Lfs9kTBA8W3K1nti8CViMh8YjCAM-MwsNMLpqAZlPoE`.

5. **Check permissions**: Make sure the Google account running the Apps Script has edit access to the sheet.

## Testing

You can run the `direct-sheet-test.js` script we created to send a test submission:

```
node direct-sheet-test.js
```

This will send a test submission to your Google Sheet and provide information about where the data should appear.

## Next Steps

Once you've confirmed the data is being recorded correctly, you can continue using your forms as normal. All submissions will be collected in the "All Enquiries" tab of your Google Sheet.
