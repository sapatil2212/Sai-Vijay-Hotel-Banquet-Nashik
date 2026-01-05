/**
 * Unified form service for all form types with optimized submission
 * This service handles contact, room booking, and banquet booking forms
 */

// Common interface for all form types
interface BaseFormData {
  name: string;
  email: string;
  timestamp?: string;
}

// Contact form data
export interface ContactFormData extends BaseFormData {
  mobile: string;
  enquiryType: string;
  eventType?: string;
  message: string;
}

// Room booking form data
export interface RoomBookingData extends BaseFormData {
  contactNo: string;
  roomType: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: string;
  kids?: string;
  specialRequirements?: string;
}

// Banquet booking form data
export interface BanquetBookingData extends BaseFormData {
  contactNo: string;
  eventType: string;
  fromDate: Date;
  toDate: Date;
  guests: string;
  specialRequests?: string;
}

// Response type for all form submissions
interface FormResponse {
  success: boolean;
  message: string;
}

/**
 * Helper function to create a fetch request with timeout
 * This prevents the form from hanging if the server is slow to respond
 */
const fetchWithTimeout = (url: string, options: RequestInit, timeout = 8000): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ) as Promise<Response>
  ]);
};

/**
 * Get the Google Sheet URL for form submissions
 * In production (Vercel), we use the server-side proxy to avoid CORS issues
 * The proxy handles the redirect that Google Apps Script does for POST requests
 */
const getGoogleSheetUrl = (): string => {
  // In production, use the server-side proxy to avoid CORS/redirect issues
  // The proxy is at /api/sheet-proxy and handles all the Google Apps Script quirks
  const proxyUrl = '/api/sheet-proxy';
  console.log('[SHEET URL] Using server-side proxy:', proxyUrl);
  return proxyUrl;
};

/**
 * Submit contact form data
 */
export const submitContactForm = async (formData: ContactFormData): Promise<FormResponse> => {
  return submitFormData(formData, 'contact', '/api/contact');
};

/**
 * Submit room booking form data
 */
export const submitRoomBooking = async (formData: RoomBookingData): Promise<FormResponse> => {
  return submitFormData(formData, 'room', '/api/booking');
};

/**
 * Submit banquet booking form data
 */
export const submitBanquetBooking = async (formData: BanquetBookingData): Promise<FormResponse> => {
  return submitFormData(formData, 'banquet', '/api/banquet-booking');
};

/**
 * Generic form submission function used by all form types
 * This function sends data to both the API endpoint and directly to Google Sheets
 * This ensures data is stored even if one of the endpoints fails
 */
async function submitFormData(formData: any, formType: string, apiEndpoint: string): Promise<FormResponse> {
  try {
    // Add timestamp and form type for better tracking
    const enhancedFormData = {
      ...formData,
      formType,
      timestamp: new Date().toISOString()
    };

    // Get the Google Sheet URL
    const sheetUrl = getGoogleSheetUrl();
    console.log('Using Google Sheet URL:', sheetUrl);
    
    // Start both requests in parallel
    const [apiResponse, sheetResponse] = await Promise.all([
      // API request for email sending
      fetchWithTimeout(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedFormData),
      }, 8000).catch(error => {
        console.error(`API request to ${apiEndpoint} failed:`, error);
        return new Response(JSON.stringify({ success: false, message: 'Form submission failed' }));
      }),
      
      // Request to server-side proxy (which forwards to Google Sheet)
      // Using our own proxy avoids CORS issues with Google Apps Script
      fetchWithTimeout(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Our proxy accepts JSON
        },
        body: JSON.stringify(enhancedFormData),
      }, 8000).catch(error => {
        console.error('Google Sheet proxy request failed:', error);
        return new Response(JSON.stringify({ success: false, message: 'Sheet storage failed' }));
      })
    ]);

    // Process API response
    const apiSuccess = apiResponse.ok;
    let apiData;
    try {
      apiData = await apiResponse.json();
    } catch (error) {
      console.error('Error parsing API response:', error);
      apiData = { success: false, message: 'Invalid API response' };
    }

    // Process Sheet response
    const sheetSuccess = sheetResponse.ok;
    let sheetData;
    try {
      sheetData = await sheetResponse.json();
    } catch (error) {
      console.error('Error parsing Sheet response:', error);
      sheetData = { success: false, message: 'Invalid Sheet response' };
    }

    // Consider the submission successful if either the API or Sheet request succeeded
    const success = apiSuccess || sheetSuccess;
    
    // Determine appropriate message based on results
    let message = 'Your submission has been received successfully!';
    
    if (!success) {
      message = 'There was an issue with your submission. Please try again.';
    } else if (!apiSuccess && sheetSuccess) {
      message = 'Your information was saved, but there might be a delay in our response.';
      console.warn('Form data saved to Sheet but API failed');
    } else if (apiSuccess && !sheetSuccess) {
      message = 'Your request was sent successfully!';
      console.warn('Form data saved to API but not to Sheet');
    }

    return {
      success,
      message
    };
  } catch (error) {
    console.error('Error in form submission:', error);
    return {
      success: false,
      message: 'There was an error processing your request. Please try again later.'
    };
  }
}
