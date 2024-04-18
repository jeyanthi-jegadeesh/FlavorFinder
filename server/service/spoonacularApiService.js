const {spoonacularBaseURL, apiKey} = require('../config.js');

async function getRandomRecipes(){
    try {
        console.log('API URL :::: ',`${spoonacularBaseURL}/recipes/random?number=10&apiKey=${apiKey}`);
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

module.exports = {getRandomRecipes, searchRecipes}