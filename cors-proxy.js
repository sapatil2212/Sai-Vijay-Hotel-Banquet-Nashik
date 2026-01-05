// CORS Proxy Server for local development
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Parse text bodies
app.use(bodyParser.text());

// Parse JSON bodies
app.use(bodyParser.json());

// Create a proxy for Google Apps Script
app.use('/google-script', (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }
  
  // Log the request
  console.log(`Proxying request to: ${targetUrl}`);
  console.log('Request body:', req.body);
  
  // Forward the request to Google Apps Script
  fetch(targetUrl, {
    method: req.method,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: req.body
  })
  .then(response => response.text())
  .then(data => {
    console.log('Response from Google Apps Script:', data);
    res.send(data);
  })
  .catch(error => {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Failed to proxy request', details: error.message });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`CORS Proxy server running at http://localhost:${PORT}`);
  console.log(`Use it by making requests to: http://localhost:${PORT}/google-script?url=YOUR_GOOGLE_SCRIPT_URL`);
});
