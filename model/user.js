//model/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')()
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.

var userSchema = new Schema( {
        
        firstName: {type: String, hide: true},
        surname: {type: String, hide: true},
        email: {type: String, hide: true},
        age: {type: String, hide: true},
        postcode: {type: String, hide: true},
        userCode: {type: String, hide: true}
});

userSchema.plugin(mongooseHidden)
//export our module to use in server.js
module.exports = mongoose.model('user', userSchema);
