var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new GitHubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {

        var searchQuery = {
            email: profile.emails[0].value
        };

        var updates = {
            name: profile.displayName,
            email: profile.emails[0].value,
            githubId: profile.id,
            loginType: "GH"
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
