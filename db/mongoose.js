//connect to localhost

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Ecommerce");
//console.log("connected to mongoose");

//module.exports(mongoose);
module.exports = {mongoose};