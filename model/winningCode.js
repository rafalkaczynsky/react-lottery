//model/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')()
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.

var winningCodeSchema = new Schema({
    code: {type: String, hide: true},
    title: {type: String, hide: true},
    description: {type: String, hide: true},
    videoUrl: {type: String, hide: true},
    claimed: {type: Boolean, hide: true}
});

winningCodeSchema.plugin(mongooseHidden)

//export our module to use in server.js
module.exports = mongoose.model('winningCode', winningCodeSchema);
