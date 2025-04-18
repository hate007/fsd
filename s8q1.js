// server.js

const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set status and content type
  res.end('Hello from Node.js Web Server!\n');
});

// Choose a port (e.g., 3000)
const PORT = 3001;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

