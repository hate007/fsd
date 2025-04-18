// fileServer.js

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Prevent directory traversal attacks
  const safePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
  
  // Default to index.html if no file is requested
  const fileName = safePath === '/' ? 'index.html' : safePath.slice(1);

  fs.readFile(fileName, (err, data) => {
    if (err) {
      // File not found or error reading
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: File does not exist or cannot be accessed.');
    } else {
      // File found and read successfully
      res.writeHead(200, { 'Content-Type': getContentType(fileName) });
      res.end(data);
    }
  });
});

// Determine content type by file extension
function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.txt': return 'text/plain';
    default: return 'application/octet-stream';
  }
}

// Start server
server.listen(3003, () => {
  console.log('Server running at http://localhost:3003');
});

