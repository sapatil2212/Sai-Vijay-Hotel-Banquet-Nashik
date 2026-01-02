import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { guestEmailTemplate, adminEmailTemplate } from './emailTemplates';

// Define types
interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  enquiryType: string;
  eventType?: string;
  message: string;
}

// Load environment variables
dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email to guest
export const sendGuestEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: formData.email,
      subject: 'Thank You for Contacting Hotel Sai Vijay',
      html: guestEmailTemplate(formData),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending guest email:', error);
    return false;
  }
};

// Send email to admin
export const sendAdminEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_BCC,
      subject: `New Enquiry: ${formData.enquiryType} from ${formData.name}`,
      html: adminEmailTemplate(formData),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    return false;
  }
};
