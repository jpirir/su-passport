var passport = require('passport');
var AzureStrategy = require('passport-azure-ad-oauth2').Strategy;

var User = require('../../models/user');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');
var init = require('./init');

passport.use(new AzureStrategy({
        clientID: config.passport.azure.clientID,
        clientSecret: config.passport.azure.clientSecret,
        callbackURL: config.passport.azure.callbackURL,
        resource: '00000003-0000-0000-c000-000000000000',
        tenant: 'universales.com'
    },
    function (accessToken, refresh_token, params, profile, done) {

        profile = jwt.decode(params.id_token);

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            email: profile.email,
            social: {
                azure: profile.oid
            },
            loginType: "MI"
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