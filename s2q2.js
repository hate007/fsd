const fs = require('fs');
console.log("\nFile Contents of file before append:",
fs.readFileSync("programming.txt", "utf8"));
fs.appendFile("programming.txt", "Welcome to node js",
(err) => {
if (err) {
console.log(err);
}
else {
console.log("\nFile Contents of file after append:",
fs.readFileSync("programming.txt", "utf8"));
}
});
