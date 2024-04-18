const mongoose = require('./');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipeId: Number,
  title: String,
  ingredients: String,
  instructions: String,
  image:String
});

const Recipe = mongoose.model('Recipe', recipeSchema);


module.exports = Recipe;