import fetch from 'node-fetch';

/**
 * Direct server-side submission to Google Sheets
 * This completely bypasses CORS issues by handling the submission on the server
 */
export default async function handler(req, res) {
  // Set CORS headers for the API response
  res.setHeader('Access-Control-Allow-Credentials', true);
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
    const sheetUrl = process.env.WEB_APP_SHEET_URL;
    
    if (!sheetUrl) {
      console.error('Google Sheet URL not configured');
      return res.status(500).json({
        success: false,
        message: 'Google Sheet URL not configured'
      });
    }

    console.log('Submitting to Google Sheet:', sheetUrl);
    console.log('Form data:', JSON.stringify(req.body));

    // Forward the request body to the Google Sheet
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // Get the response text
    const responseText = await response.text();
    console.log('Google Sheet response:', responseText);

    // Check if the request was successful
    if (!response.ok) {
      console.error(`Google Sheet API error (${response.status}):`, responseText);
      return res.status(response.status).json({
        success: false,
        message: `Google Sheet API error: ${response.status}`,
        details: responseText
      });
    }

    // Parse the response from the Google Sheet
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing Google Sheet response:', error);
      return res.status(500).json({
        success: false,
        message: 'Invalid response from Google Sheet',
        rawResponse: responseText
      });
    }
    
    // Return the response from the Google Sheet
    return res.status(200).json({
      ...data,
      _proxyNote: 'Successfully submitted via server-side proxy'
    });
  } catch (error) {
    console.error('Error in direct-sheet-submit:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: error.message
    });
  }
}
