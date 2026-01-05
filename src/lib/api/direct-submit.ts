/**
 * Direct submission module that bypasses all other form submission code
 * This ensures that all form data goes to the correct Google Sheet URL
 * 
 * IMPORTANT: In production, we use a server-side proxy to avoid CORS issues
 * Google Apps Script redirects POST requests, which causes issues with browser fetch
 */

// Use the server-side proxy endpoint for all form submissions
// This avoids CORS issues and handles Google's redirect properly
const CORRECT_URL = '/api/sheet-proxy';

/**
 * Direct contact form submission
 * This bypasses all other submission logic to ensure data goes to the correct URL
 */
export async function directContactSubmit(formData: any) {
  console.log('[DIRECT SUBMIT] Contact form using URL:', CORRECT_URL);
  return directSubmit({
    ...formData,
    formType: 'contact',
    timestamp: new Date().toISOString()
  });
}

/**
 * Direct room booking submission
 * This bypasses all other submission logic to ensure data goes to the correct URL
 */
export async function directRoomSubmit(formData: any) {
  console.log('[DIRECT SUBMIT] Room booking using URL:', CORRECT_URL);
  return directSubmit({
    ...formData,
    formType: 'room',
    timestamp: new Date().toISOString()
  });
}

/**
 * Direct banquet booking submission
 * This bypasses all other submission logic to ensure data goes to the correct URL
 */
export async function directBanquetSubmit(formData: any) {
  console.log('[DIRECT SUBMIT] Banquet booking using URL:', CORRECT_URL);
  return directSubmit({
    ...formData,
    formType: 'banquet',
    timestamp: new Date().toISOString()
  });
}

/**
 * Direct submission to Google Sheet via server-side proxy
 * Core function that sends data through our proxy to avoid CORS issues
 */
async function directSubmit(data: any): Promise<{success: boolean, message: string}> {
  try {
    console.log('[DIRECT SUBMIT] Sending data via proxy:', CORRECT_URL);
    console.log('[DIRECT SUBMIT] Data:', data);
    
    // Submit through server-side proxy (which forwards to Google Sheet)
    const response = await fetch(CORRECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Our proxy accepts JSON
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('[DIRECT SUBMIT] Response:', result);
    
    return {
      success: result.success === true,
      message: result.message || 'Form submitted successfully'
    };
  } catch (error) {
    console.error('[DIRECT SUBMIT] Error:', error);
    
    return {
      success: false,
      message: 'Error submitting form. Please try again.'
    };
  }
}
