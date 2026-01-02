interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  enquiryType: string;
  eventType?: string;
  message: string;
}

// Function to send form data to Google Sheets
export const sendToGoogleSheet = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const deployUrl = process.env.GOOGLE_SHEET_DEPLOY_URL;
    
    if (!deployUrl) {
      console.error('Google Sheet deploy URL not found in environment variables');
      return false;
    }
    
    // Format date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: `${formattedDate} ${formattedTime}`,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      enquiryType: formData.enquiryType,
      eventType: formData.eventType || 'N/A',
      message: formData.message || 'N/A'
    };
    
    // Send data to Google Sheets
    const response = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send data to Google Sheets: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    return false;
  }
};
