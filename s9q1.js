// formServer.js

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  if (pathname === '/' && req.method === 'GET') {
    // Serve the HTML form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>String Concatenator</title></head>
        <body>
          <h2>Concatenate Two Strings</h2>
          <form method="GET" action="/concat">
            <label>First String: <input type="text" name="str1" /></label><br><br>
            <label>Second String: <input type="text" name="str2" /></label><br><br>
            <input type="submit" value="Concatenate" />
          </form>
        </body>
      </html>
    `);
  } else if (pathname === '/concat' && req.method === 'GET') {
    // Get the query parameters
    const params = querystring.parse(parsedUrl.query);
    const result = (params.str1 || '') + (params.str2 || '');

    // Show result
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>Result</title></head>
        <body>
          <h2>Concatenated Result:</h2>
          <p><strong>${result}</strong></p>
          <a href="/">Go Back</a>
        </body>
      </html>
    `);
  } else {
    // Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});

// Start the server
server.listen(3002, () => {
  console.log('Server running at http://localhost:3002');
});

