const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static HTML
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/register', (req, res) => {
  const { name, email, age, department } = req.body;
  const errors = [];

  // Name: alphabets only
  if (!name || !/^[A-Za-z\s]+$/.test(name)) {
    errors.push("Name must contain alphabets only.");
  }

  // Email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format.");
  }

  // Age: numeric and in range
  const ageInt = parseInt(age);
  if (!age || isNaN(ageInt) || ageInt < 18 || ageInt > 65) {
    errors.push("Age must be a number between 18 and 65.");
  }

  // Department
  if (!department || department.trim() === "") {
    errors.push("Department cannot be empty.");
  }

  if (errors.length > 0) {
    res.send(`<h2>Validation Errors:</h2><ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul><a href="/">Go Back</a>`);
  } else {
    res.send(`<h2>Registration Successful</h2><p>Welcome, ${name}!</p><a href="/">Go Back</a>`);
  }
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

