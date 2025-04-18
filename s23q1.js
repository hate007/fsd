const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the path to the HTML file
const filePath = path.join(__dirname, 'index.html');

// Create the server
const server = http.createServer((req, res) => {
    // Only serve the HTML on root path
    if (req.url === '/') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                console.error('Error reading the file:', err);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else {
        // Handle 404
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
});

// Start the server
const PORT = 3006;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

