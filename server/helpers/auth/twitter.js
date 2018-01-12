var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../../models/user');
var config = require('../../config/config');
var init = require('./init');

passport.use(new TwitterStrategy({
        consumerKey: config.passport.twitter.consumerKey,
        consumerSecret: config.passport.twitter.consumerSecret,
        callbackURL: config.passport.twitter.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            email: profile.email,
            social: {
                twitter: profile.id
            },
            loginType: "TW"
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