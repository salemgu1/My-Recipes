const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

let recipes = []




const fechData = function (ingredient){
  fetch(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
  .then(response => response.json())
  .then(data => {
    const recipeList = data.results.map(recipe => ({
      idMeal:recipe.idMeal,
      title: recipe.title,
      thumbnail: recipe.thumbnail,
      href: recipe.href,
      ingredients: recipe.ingredients
    }));
    recipes = recipeList
    console.log(recipeList);
  })
  .catch(error => console.error(error));
}


app.get('/recipes/:ingredient', function (req, res) {
  const ingredient = req.params.ingredient
  fechData(ingredient)
  res.send(recipes)
})


app.get('/recipes/:contain', function (req, res) {
  const ingredient = req.params.contain
  fechData(ingredient)
  res.send(recipes)
})


const port = 1337 //because why not
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})