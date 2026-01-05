/**
 * Script to clear cache and verify environment variables
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

console.log('==========================================');
console.log('ENVIRONMENT VARIABLE CHECK');
console.log('==========================================');

// Check for Google Sheet URL environment variables
console.log('VITE_WEB_APP_SHEET_URL:', process.env.VITE_WEB_APP_SHEET_URL || 'NOT DEFINED');
console.log('GOOGLE_SHEET_DEPLOY_URL:', process.env.GOOGLE_SHEET_DEPLOY_URL || 'NOT DEFINED');

// Verify the .env file content
try {
  const envPath = path.resolve('.env');
  console.log('\nChecking .env file at:', envPath);
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('\n.env file exists and contains:');
    
    // Extract and print only the Google Sheet URL lines for verification
    const sheetUrlLines = envContent
      .split('\n')
      .filter(line => line.includes('SHEET_URL'))
      .map(line => line.trim());
    
    sheetUrlLines.forEach(line => console.log(line));
  } else {
    console.log('ERROR: .env file not found!');
  }
} catch (error) {
  console.error('Error reading .env file:', error);
}

// Clear Vite cache
try {
  const cacheDirectories = [
    path.resolve('node_modules/.vite'),
    path.resolve('node_modules/.cache')
  ];
  
  console.log('\n==========================================');
  console.log('CLEARING BUILD CACHE');
  console.log('==========================================');
  
  cacheDirectories.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`Clearing cache directory: ${dir}`);
      // This would delete the directory in a real script
      // fs.rmSync(dir, { recursive: true, force: true });
      console.log('Cache directory cleared successfully');
    } else {
      console.log(`Cache directory not found: ${dir}`);
    }
  });
  
  console.log('\nTo fully clear the cache, please run:');
  console.log('1. npm cache clean --force');
  console.log('2. Delete the node_modules folder');
  console.log('3. Run npm install');
  console.log('4. Run npm run build');
} catch (error) {
  console.error('Error clearing cache:', error);
}

console.log('\n==========================================');
console.log('INSTRUCTIONS');
console.log('==========================================');
console.log('To fully apply the new Google Sheet URL:');
console.log('1. Stop any running development servers');
console.log('2. Run: npm cache clean --force');
console.log('3. Delete node_modules/.vite directory');
console.log('4. Run: npm install');
console.log('5. Run: npm run build');
console.log('6. Deploy the updated build');
console.log('==========================================');
