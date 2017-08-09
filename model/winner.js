//import dependency
var mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')()
var Schema = mongoose.Schema;

//var User = require('./users');
//var WinningCode = require('./winningCode');
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.


var winnerSchema = new Schema({
    user: {type: {}, hide: true},
    winnerCode: {type: {}, hide: true}
});


winnerSchema.plugin(mongooseHidden)

//export our module to use in server.js
module.exports = mongoose.model('winners', winnerSchema);