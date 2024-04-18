const apiService = require('../service/spoonacularApiService')

async function getRandomRecipes(ctx) {
    
    try {
        const response =  await apiService.getRandomRecipes();
        const data = await response.json();
        console.log(data);
        ctx.body = data;
    }catch(error){
        console.error('Error fetching random recipe:', error);
        ctx.status = error.response.status || 500;
        ctx.body = { error: error.message || 'Internal Server Error' };
    }
   
}

async function searchRecipes(ctx){
    try{
        console.log(ctx.params.ingredients);
        const ingredients = ctx.params.ingredients;
        const response =  await apiService.searchRecipes(ingredients);
        const data = await response.json();
        console.log(data);
        ctx.body = data;
    }catch(error){
        console.error('Error fetching recipes with ingredients:', error);
        ctx.status = error.response.status || 500;
        ctx.body = { error: error.message || 'Internal Server Error' };
    }
}

module.exports = {getRandomRecipes, searchRecipes}