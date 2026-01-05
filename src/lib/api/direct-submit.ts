/**
 * Direct submission module for form data
 * Sends data to both Google Sheets (for storage) and Email API (for notifications)
 */

// API endpoints
const SHEET_PROXY_URL = '/api/sheet-proxy';
const CONTACT_API_URL = '/api/contact';
const BOOKING_API_URL = '/api/booking';
const BANQUET_API_URL = '/api/banquet-booking';

/**
 * Direct contact form submission
 * Sends to both Google Sheets and Email API
 */
export async function directContactSubmit(formData: any) {
  console.log('[DIRECT SUBMIT] Contact form submission');
  
  // Ensure all conditional fields are explicitly included even if empty
  const enhancedData = {
    ...formData,
    formType: 'contact',
    eventType: formData.eventType || '',
    roomType: formData.roomType || '',
    occupancyType: formData.occupancyType || '',
    timestamp: new Date().toISOString()
  };
  
  // Log the data to verify all fields are included
  console.log('[DIRECT SUBMIT] Enhanced data:', {
    ...enhancedData,
    enquiryType: enhancedData.enquiryType,
    eventType: enhancedData.eventType,
    roomType: enhancedData.roomType,
    occupancyType: enhancedData.occupancyType
  });
  
  // Submit to both endpoints in parallel
  const [sheetResult, emailResult] = await Promise.all([
    submitToSheet(enhancedData),
    submitToEmailApi(CONTACT_API_URL, enhancedData)
  ]);
  
  console.log('[DIRECT SUBMIT] Sheet result:', sheetResult);
  console.log('[DIRECT SUBMIT] Email result:', emailResult);
  
  // Consider success if at least one succeeded
  const success = sheetResult.success || emailResult.success;
  
  return {
    success,
    message: success 
      ? 'Your message has been sent successfully!' 
      : 'There was an issue submitting your form. Please try again.'
  };
}

/**
 * Direct room booking submission
 * Sends to both Google Sheets and Email API
 */
export async function directRoomSubmit(formData: any) {
  console.log('[DIRECT SUBMIT] Room booking submission');
  const enhancedData = {
    ...formData,
    formType: 'room',
    timestamp: new Date().toISOString()
  };
  
  // Submit to both endpoints in parallel
  const [sheetResult, emailResult] = await Promise.all([
    submitToSheet(enhancedData),
    submitToEmailApi(BOOKING_API_URL, enhancedData)
  ]);
  
  console.log('[DIRECT SUBMIT] Sheet result:', sheetResult);
  console.log('[DIRECT SUBMIT] Email result:', emailResult);
  
  const success = sheetResult.success || emailResult.success;
  
  return {
    success,
    message: success 
      ? 'Your booking request has been received!' 
      : 'There was an issue submitting your booking. Please try again.'
  };
}

/**
 * Direct banquet booking submission
 * Sends to both Google Sheets and Email API
 */
export async function directBanquetSubmit(formData: any) {
  console.log('[DIRECT SUBMIT] Banquet booking submission');
  const enhancedData = {
    ...formData,
    formType: 'banquet',
    timestamp: new Date().toISOString()
  };
  
  // Submit to both endpoints in parallel
  const [sheetResult, emailResult] = await Promise.all([
    submitToSheet(enhancedData),
    submitToEmailApi(BANQUET_API_URL, enhancedData)
  ]);
  
  console.log('[DIRECT SUBMIT] Sheet result:', sheetResult);
  console.log('[DIRECT SUBMIT] Email result:', emailResult);
  
  const success = sheetResult.success || emailResult.success;
  
  return {
    success,
    message: success 
      ? 'Your banquet booking request has been received!' 
      : 'There was an issue submitting your booking. Please try again.'
  };
}

/**
 * Submit data to Google Sheets via proxy
 */
async function submitToSheet(data: any): Promise<{success: boolean, message: string}> {
  try {
    console.log('[SHEET] Sending to:', SHEET_PROXY_URL);
    
    const response = await fetch(SHEET_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const result = await response.json();
    return {
      success: result.success === true,
      message: result.message || 'Data saved to sheet'
    };
  } catch (error) {
    console.error('[SHEET] Error:', error);
    return {
      success: false,
      message: 'Failed to save to sheet'
    };
  }
}

/**
 * Submit data to Email API for sending notifications
 */
async function submitToEmailApi(apiUrl: string, data: any): Promise<{success: boolean, message: string}> {
  try {
    console.log('[EMAIL API] Sending to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[EMAIL API] Error response:', errorText);
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const result = await response.json();
    return {
      success: result.success === true,
      message: result.message || 'Email sent'
    };
  } catch (error) {
    console.error('[EMAIL API] Error:', error);
    return {
      success: false,
      message: 'Failed to send email'
    };
  }
}
