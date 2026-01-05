/**
 * This file contains the direct, hardcoded URL for Google Sheet submissions
 * This bypasses any environment variable issues
 */

// The correct URL for Google Sheet submissions, hardcoded to ensure consistency
export const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxcUn5beNaO6oGlSF4cawDC1ErLLD9zGYXLanMOuqWTYkClmLUA23hdecBqssEVYkb9/exec';

// Log the URL once during import to verify it's being used
console.log('%c[Google Sheet] Using direct URL:', 'color: green; font-weight: bold', GOOGLE_SHEET_URL);
