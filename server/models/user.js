var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create User Schema
var User = new Schema({
    name: String,
    email: String,
    azureId: String,
    facebookId: String,
    githubId: String,
    googleId: String,
    linkedinId: String,
    openidId: String,
    twitterId: String,
    loginType: String
});

module.exports = mongoose.model('users', User);