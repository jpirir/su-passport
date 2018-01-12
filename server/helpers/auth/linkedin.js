var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');

var User = require('../../models/user');
var config = require('../../config/config');
var init = require('./init');

passport.use(new LinkedInStrategy({
        consumerKey: config.passport.linkedin.clientID,
        consumerSecret: config.passport.linkedin.clientSecret,
        callbackURL: config.passport.linkedin.callbackURL,
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
    },
    function (token, tokenSecret, profile, done) {

        var searchQuery = {
            email: profile.emailAddress
        };

        var updates = {
            email: profile.emailAddress,
            social: {
                linkedin: profile.id
            },
            loginType: "LI"
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