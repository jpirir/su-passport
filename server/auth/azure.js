var passport = require('passport');
var AzureStrategy = require('passport-azure-ad-oauth2').Strategy;

var User = require('../models/user');
var config = require('../_config');
var jwt = require('jsonwebtoken');
var init = require('./init');

passport.use(new AzureStrategy({
        clientID: config.azure.clientID,
        clientSecret: config.azure.clientSecret,
        callbackURL: config.azure.callbackURL,
        resource: '00000003-0000-0000-c000-000000000000',
        tenant: 'universales.com'
    },
    function (accessToken, refresh_token, params, profile, done) {

        profile = jwt.decode(params.id_token);

        console.log(profile);
        console.log(profile.upn);

        var searchQuery = {
            email: profile.upn
        };

        var updates = {
            name: profile.name,
            email: profile.upn,
            azureId: profile.oid,
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