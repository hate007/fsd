const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipes');

const app = express();
app.use(bodyParser.json());

app.use('/api/recipes', recipeRoutes);

const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

