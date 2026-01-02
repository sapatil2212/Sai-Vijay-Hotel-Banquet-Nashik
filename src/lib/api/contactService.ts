interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  enquiryType: string;
  eventType?: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Send data to the integrated API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Handle non-200 responses
      const errorText = await response.text();
      console.error(`API error (${response.status}):`, errorText);
      return {
        success: false,
        message: `Server error (${response.status}). Please try again later.`
      };
    }

    try {
      const data = await response.json();
      return {
        success: data.success,
        message: data.message
      };
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      return {
        success: false,
        message: 'Invalid response from server. Please try again later.'
      };
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'There was an error sending your message. Please try again later or contact us directly.'
    };
  }
};
