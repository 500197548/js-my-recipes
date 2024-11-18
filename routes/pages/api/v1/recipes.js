const express = require('express') 
const router = express.Router() 
const recipes = require('../../../../data/recipes.json') 

router.get('/', (req, res) => {
  const recipesResult = recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      prepTime: recipe.prepTime,
      difficulty: recipe.difficulty
    } 
  }) 
  res.json(recipesResult) 
}) 

router.post('/recipe/add', (req, res) => {
  const { title, image, ingredients, instructions, prepTime, difficulty } = req.body 
  
  const newId = recipes.length + 1 
  const newRecipe = {
    id: newId,
    title,
    image,
    ingredients,
    instructions,
    prepTime,
    difficulty
  } 

  recipes.push(newRecipe) 

  const addedRecipe = newRecipe 
  res.status(201).json(addedRecipe) 
}) 

router.get('/recipe/:id', (req, res) => {
  const recipeId = parseInt(req.params.id, 10)
  const recipeResult = recipes.find(recipe => recipe.id === recipeId) 

  if (recipeResult) {
    res.json(recipeResult) 
  } else {
    res.status(404).json({ message: 'Recipe not found' }) 
  }
}) 

module.exports = router 
