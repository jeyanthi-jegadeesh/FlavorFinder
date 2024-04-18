const Router = require('koa-router');
const router = new Router();
const recipeController = require('./controllers/recipe.js');

router.get('/randomRecipes', recipeController.getRandomRecipes);
router.get('/searchRecipes/:ingredients', recipeController.searchRecipes);
router.post('/saveRecipe', recipeController.saveRecipe)
router.get('/wishlist/:user', recipeController.getWishList);
module.exports = router;