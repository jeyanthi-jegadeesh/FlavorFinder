const Router = require('koa-router');
const router = new Router();
const recipeController = require('./controllers/recipe.js');

router.get('/randomRecipes', recipeController.getRandomRecipes);
router.get('/searchRecipes/:ingredients', recipeController.searchRecipes);
module.exports = router;