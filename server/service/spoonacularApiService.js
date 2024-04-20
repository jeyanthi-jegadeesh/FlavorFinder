const {spoonacularBaseURL, apiKey} = require('../config.js');

async function getRandomRecipes(){
    try {
        return await fetch(`${spoonacularBaseURL}/recipes/random?number=10&apiKey=${apiKey}`);
      } catch (error) {
        console.error('Error fetching recipe from Spoonacular api:', error);
      }
}

async function searchRecipes(ingredients){
    try {
        return await fetch(`${spoonacularBaseURL}/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`);
      } catch (error) {
        console.error('Error fetching recipe with input ingredients from Spoonacular api:', error);
    }
}

async function getRecipeDetails(recipeId){
    try {
      //https://api.spoonacular.com/recipes/{id}/information
      // https://api.spoonacular.com/recipes/633547/information?apiKey=1da7ba3c94c44581a93b8d71a208a21b
      return await fetch(`${spoonacularBaseURL}/recipes/${recipeId}/information?apiKey=${apiKey}`);
    } catch (error) {
      console.error(`Error fetching recipe details for recipe id ${recipeId} from Spoonacular api:`, error);
    }
}

module.exports = {getRandomRecipes, searchRecipes, getRecipeDetails}