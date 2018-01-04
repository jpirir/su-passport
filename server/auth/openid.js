var passport = require('passport');
var OpenIDStrategy = require('passport-openidconnect').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new OpenIDStrategy({
        issuer: 'http://login.ordenadores.gt/openid-connect-server-webapp/',
        tokenURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/token',
        userInfoURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/userinfo',
        authorizationURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/authorize',
        clientID: config.openID.clientID,
        clientSecret: config.openID.clientSecret,
        callbackURL: config.openID.callbackURL
    },
    function (iss, sub, profile, accessToken, refreshToken, done) {

        console.log(profile);

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            name: profile.displayName,
            email: profile.email,
            openidId: profile.id
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