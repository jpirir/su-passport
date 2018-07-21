var passport = require('passport');
var OpenIDStrategy = require('passport-openidconnect').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new OpenIDStrategy({
        issuer: 'https://login.ordenadores.gt/openid-connect-server-webapp/',
        tokenURL: 'https://login.ordenadores.gt/openid-connect-server-webapp/token',
        userInfoURL: 'https://login.ordenadores.gt/openid-connect-server-webapp/userinfo',
        authorizationURL: 'https://login.ordenadores.gt/openid-connect-server-webapp/authorize',
        clientID: config.openID.clientID,
        clientSecret: config.openID.clientSecret,
        callbackURL: config.openID.callbackURL,
        scope: 'profile email',
        tokenName: 'access_token'
        
    },function (iss, sub, profile, done) {
        console.log("profile:" + JSON.stringify(profile._json));

        
        var searchQuery = {
            email: profile._json.email
        };

        var updates = {
            name: profile._json.name,
            email: profile._json.email,
            openidId: profile._json.sub,
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