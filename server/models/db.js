const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.dbConnection)
 .then(() => {
    console.log('DATABASE connection established');
 })
 .catch((error) => {
    console.log('error ', error);
 })


module.exports = mongoose;