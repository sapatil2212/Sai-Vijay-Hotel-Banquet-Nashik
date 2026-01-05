/**
 * This file centralizes the Google Sheet URL to ensure all forms use the same URL
 * It's designed to break the build if the environment variable is missing
 */

// The URL used for all Google Sheet submissions
export const GOOGLE_SHEET_URL: string = import.meta.env.VITE_WEB_APP_SHEET_URL;

// This validation ensures the build will fail if the URL is missing
if (!GOOGLE_SHEET_URL) {
  console.error('CRITICAL ERROR: VITE_WEB_APP_SHEET_URL is not defined in environment variables');
  throw new Error('Google Sheet URL is not configured. Check your .env file.');
}

// Log the URL being used during development to verify it's correct
if (import.meta.env.DEV) {
  console.log('%c[Google Sheet URL]', 'color: green; font-weight: bold', GOOGLE_SHEET_URL);
}
