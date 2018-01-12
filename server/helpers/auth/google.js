var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('../../models/user');
var config = require('../../config/config');
var init = require('./init');

passport.use(new GoogleStrategy({
        clientID: config.passport.google.clientID,
        clientSecret: config.passport.google.clientSecret,
        callbackURL: config.passport.google.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            email: profile.email,
            social: {
                google: profile.id
            },
            loginType: "GO"
        };

        var options = {
            upsert: true
        };

        // update the user if s/he exists or add a new user
        User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
            if (err) {
                return done(err);
            } else {
                return done(null, user);
            }
        });
    }
));

// serialize user into the session
init();

module.exports = passport;