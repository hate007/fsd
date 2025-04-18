// modules.js

function getCurrentDateTime() {
  const now = new Date();
  return now.toString();
}

// Export the function so it can be used in another file
module.exports = {
  getCurrentDateTime
};

