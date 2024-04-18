const mongoose = require('./');

const Schema = mongoose.Schema;

const userWishlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' }
});

const UserWishlist = mongoose.model('UserWishlist', userWishlistSchema);


module.exports = UserWishlist;