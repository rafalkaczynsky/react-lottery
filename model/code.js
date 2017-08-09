//import dependency
var mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')()
var Schema = mongoose.Schema;

//var User = require('./users');
//var WinningCode = require('./winningCode');
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.


var codeSchema = new Schema({
    
    code: {type: String, hide: true},
    winning: {type: Boolean, hide: true},
    used: {type:Boolean, hide: true},
});


codeSchema.plugin(mongooseHidden)

//export our module to use in server.js
module.exports = mongoose.model('code', codeSchema);






/*
//import dependency
var mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.



var codeSchema = new Schema({

    code: {type: String, hide: true},
    winning: {type: Boolean, hide: true},
    used: false
});


codeSchema.plugin(mongooseHidden)

//export our module to use in server.js
module.exports = mongoose.model('code', codeSchema);
*/