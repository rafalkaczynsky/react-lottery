//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var User = require('./users');
//var WinningCode = require('./winningCode');
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.


var winnerSchema = new Schema({
    user: {},
    winnerCode: {}
});


//export our module to use in server.js
module.exports = mongoose.model('winners', winnerSchema);