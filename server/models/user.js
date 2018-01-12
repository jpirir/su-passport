var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create User Schema
var User = new Schema({
    user_id: Number,
    email: String,
    social: {
        azure: String,
        facebook: String,
        githubId: String,
        google: String,
        linkedin: String,
        openid: String,
        twitter: String,
    },
    loginType: String
});

module.exports = mongoose.model('users', User);