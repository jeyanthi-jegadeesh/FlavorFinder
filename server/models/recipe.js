const mongoose = require('./db');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipeId: Number,
  title: String,
  ingredients: String,
  instructions: String,
  image:String
});

const Recipe = mongoose.model('Recipes', recipeSchema);


module.exports = Recipe;