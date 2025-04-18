const http = require('http');
const fs = require('fs');
const path = require('path');

// HTML form with upload field
const formHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Upload File</title>
</head>
<body>
  <h2>Upload a File</h2>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
    <br><br>
    <button type="submit">Upload</button>
  </form>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve the HTML form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHTML);
  } else if (req.url === '/upload' && req.method === 'POST') {
    // Handle file upload (simple version)
    const boundary = req.headers['content-type'].split('boundary=')[1];
    let rawData = '';

    req.on('data', chunk => {
      rawData += chunk;
    });

    req.on('end', () => {
      // Very basic parser (use multer or formidable for real apps)
      const parts = rawData.split(boundary);
      const filePart = parts.find(p => p.includes('filename='));
      if (!filePart) {
        res.writeHead(400);
        return res.end('No file uploaded');
      }

      const match = filePart.match(/filename="(.+)"/);
      const filename = match ? match[1] : 'upload.dat';
      const fileStart = filePart.indexOf('\r\n\r\n') + 4;
      const fileContent = filePart.slice(fileStart, filePart.lastIndexOf('--')).trim();

      fs.writeFile(path.join(__dirname, filename), fileContent, 'binary', err => {
        if (err) {
          res.writeHead(500);
          return res.end('Error saving file');
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File "${filename}" uploaded successfully.`);
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

