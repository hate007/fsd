const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const { query } = url.parse(req.url, true);
  const filePath = query.file;

  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('⚠️ Please specify a file using ?file=filename.txt');
    return;
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('❌ 404 - File does not exist');
    } else {
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('❌ 404 - Unable to read file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(content);
        }
      });
    }
  });
}).listen(3002, () => {
  console.log('Server running at http://localhost:3002');
});

