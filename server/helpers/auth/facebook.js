var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../../models/user');
var config = require('../../config/config');
var init = require('./init');

passport.use(new FacebookStrategy({
        clientID: config.passport.facebook.clientID,
        clientSecret: config.passport.facebook.clientSecret,
        callbackURL: config.passport.facebook.callbackURL,
        profileFields: ['id', 'email', 'displayName', 'name', 'birthday']
    },
    function (accessToken, refreshToken, profile, done) {

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            email: profile.email,
            social: {
                facebook: profile.id
            },
            loginType: "FB"
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