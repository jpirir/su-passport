var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {

        console.log(profile);

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            name: profile.displayName,
            email: profile.email,
            twitterId: profile.id
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