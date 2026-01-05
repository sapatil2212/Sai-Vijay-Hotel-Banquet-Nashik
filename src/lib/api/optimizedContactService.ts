interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  enquiryType: string;
  eventType?: string;
  message: string;
}

/**
 * Optimized contact form submission service with improved performance and reliability
 */
export const submitContactForm = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Add timestamp and form type for better tracking
    const enhancedFormData = {
      ...formData,
      formType: 'contact',
      timestamp: new Date().toISOString()
    };

    // Create a promise with timeout to handle slow responses
    const fetchWithTimeout = (url: string, options: RequestInit, timeout = 10000): Promise<Response> => {
      return Promise.race([
        fetch(url, options),
        new Promise<Response>((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), timeout)
        ) as Promise<Response>
      ]);
    };

    // Send data directly to Google Sheet in parallel with API call
    // This ensures data is stored even if the email sending fails
    const sheetUrl = import.meta.env.VITE_WEB_APP_SHEET_URL;
    
    if (!sheetUrl) {
      console.error('VITE_WEB_APP_SHEET_URL is not defined in environment variables');
      throw new Error('Google Sheet URL is not configured');
    }

    // Start both requests in parallel
    const [apiResponse, sheetResponse] = await Promise.all([
      // API request for email sending
      fetchWithTimeout('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedFormData),
      }, 8000).catch(error => {
        console.error('API request failed:', error);
        return new Response(JSON.stringify({ success: false, message: 'Email API request failed' }));
      }),
      
      // Direct Google Sheet request for data storage
      fetchWithTimeout(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(enhancedFormData),
      }, 8000).catch(error => {
        console.error('Google Sheet request failed:', error);
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
    let message = 'Your message has been sent successfully!';
    
    if (!success) {
      message = 'There was an issue with your submission. Please try again.';
    } else if (!apiSuccess) {
      message = 'Your information was saved, but there might be a delay in our response.';
    } else if (!sheetSuccess) {
      console.warn('Form data saved to API but not to Sheet');
    }

    return {
      success,
      message
    };
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return {
      success: false,
      message: 'There was an error processing your request. Please try again later.'
    };
  }
};
