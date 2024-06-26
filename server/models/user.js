const mongoose = require('./db.js');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model('User', userSchema);


module.exports = User;