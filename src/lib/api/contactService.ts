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

    const data = await response.json();
    
    return {
      success: data.success,
      message: data.message
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'There was an error sending your message. Please try again later or contact us directly.'
    };
  }
};
