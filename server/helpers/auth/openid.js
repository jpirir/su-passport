var passport = require('passport');
var OpenIDStrategy = require('passport-openidconnect').Strategy;

var User = require('../../models/user');
var config = require('../../config/config');
var init = require('./init');

passport.use(new OpenIDStrategy({
        issuer: 'http://login.ordenadores.gt/openid-connect-server-webapp/',
        tokenURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/token',
        userInfoURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/userinfo',
        authorizationURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/authorize',
        clientID: config.passport.openID.clientID,
        clientSecret: config.passport.openID.clientSecret,
        callbackURL: config.passport.openID.callbackURL
    },
    function (iss, sub, profile, accessToken, refreshToken, done) {

        var searchQuery = {
            email: profile.email
        };

        var updates = {
            email: profile.email,
            social: {
                openid: profile.id
            },
            loginType: "OI"
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