const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Show HTML form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>Append File Content</h2>
      <form method="POST">
        File 1 (source): <input name="file1" /><br/><br/>
        File 2 (destination): <input name="file2" /><br/><br/>
        <button type="submit">Append</button>
      </form>
    `);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const { file1, file2 } = querystring.parse(body);
      const data = fs.readFileSync(file1, 'utf8');
      fs.appendFileSync(file2, data);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<p>Successfully appended contents of "${file1}" into "${file2}".</p><a href="/">Go Back</a>`);
    });
  }
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});

