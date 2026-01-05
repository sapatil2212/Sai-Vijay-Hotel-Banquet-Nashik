/**
 * Server-side proxy for Google Sheets API
 * This bypasses CORS issues by making the request from the server instead of the browser
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get the Google Sheet URL from environment variables
    const sheetUrl = process.env.GOOGLE_SHEET_DEPLOY_URL || process.env.VITE_WEB_APP_SHEET_URL;
    
    if (!sheetUrl) {
      console.error('Missing GOOGLE_SHEET_DEPLOY_URL environment variable');
      return res.status(500).json({
        success: false,
        message: 'Google Sheet URL not configured'
      });
    }

    console.log('Sheet URL:', sheetUrl);
    console.log('Request body:', JSON.stringify(req.body));

    // Make request to Google Apps Script
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(req.body),
    });

    const responseText = await response.text();
    console.log('Google response:', responseText);

    // Try to parse as JSON
    try {
      const data = JSON.parse(responseText);
      return res.status(200).json(data);
    } catch {
      return res.status(200).json({
        success: true,
        message: 'Data sent to Google Sheet',
        raw: responseText
      });
    }
  } catch (error) {
    console.error('Proxy error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
