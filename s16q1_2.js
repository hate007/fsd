const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../data/recipes.json');

// Helper to read data
function readRecipes() {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

// Helper to write data
function writeRecipes(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Get all recipes
router.get('/', (req, res) => {
  const recipes = readRecipes();
  res.json(recipes);
});

// Get recipe by ID
router.get('/:id', (req, res) => {
  const recipes = readRecipes();
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

// Add a new recipe
router.post('/', (req, res) => {
  const { title, ingredients, instructions } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const recipes = readRecipes();
  const newRecipe = {
    id: recipes.length ? recipes[recipes.length - 1].id + 1 : 1,
    title,
    ingredients,
    instructions
  };

  recipes.push(newRecipe);
  writeRecipes(recipes);
  res.status(201).json(newRecipe);
});

// Delete recipe
router.delete('/:id', (req, res) => {
  let recipes = readRecipes();
  const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Recipe not found' });

  const deleted = recipes.splice(index, 1);
  writeRecipes(recipes);
  res.json({ message: 'Recipe deleted', recipe: deleted[0] });
});

module.exports = router;

