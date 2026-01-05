/**
 * Server-side proxy for Google Sheets API
 * This bypasses CORS issues by making the request from the server instead of the browser
 * 
 * IMPORTANT: Google Apps Script redirects POST requests, which can cause issues with browser fetch.
 * This proxy handles the redirect properly and forwards the data to Google Sheets.
 */
export default async function handler(req, res) {
  // Set CORS headers for the API response
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests for actual processing
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get the Google Sheet URL from environment variables
    // Try multiple possible variable names for flexibility
    const sheetUrl = process.env.GOOGLE_SHEET_DEPLOY_URL || 
                     process.env.VITE_WEB_APP_SHEET_URL || 
                     process.env.WEB_APP_SHEET_URL;
    
    if (!sheetUrl) {
      console.error('Missing Google Sheet URL. Available env vars:', Object.keys(process.env).filter(k => k.includes('SHEET') || k.includes('GOOGLE')));
      return res.status(500).json({
        success: false,
        message: 'Google Sheet URL not configured in environment variables'
      });
    }

    console.log('Proxying request to Google Sheet:', sheetUrl);
    console.log('Request body:', JSON.stringify(req.body));

    // Forward the request body to the Google Sheet
    // Using redirect: 'follow' to handle Google's redirect properly
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Use text/plain to avoid CORS preflight on Google's end
      },
      body: JSON.stringify(req.body),
      redirect: 'follow', // Important: follow redirects
    });

    console.log('Google Sheet response status:', response.status);

    // Get response text first
    const responseText = await response.text();
    console.log('Google Sheet response text:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Google Sheet response as JSON:', parseError);
      // If we can't parse as JSON, return the raw text
      return res.status(200).json({
        success: true,
        message: 'Data sent to Google Sheet',
        rawResponse: responseText
      });
    }
    
    // Return the response from the Google Sheet
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in sheet-proxy:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: error.message
    });
  }
}
