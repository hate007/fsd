// app.js

const http = require("http");
const myModule = require("./modules");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  const currentTime = myModule.getCurrentDateTime();
  res.end("Current Date and Time: " + currentTime);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

