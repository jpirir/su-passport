var passport = require('passport');
var OpenIDStrategy = require('passport-openidconnect').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');


passport.use(new OpenIDStrategy({
    issuer: 'http://login.ordenadores.gt',
    authorizationURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/token',
    tokenURL: 'http://login.ordenadores.gt/openid-connect-server-webapp/authorize',
    clientID: config.openID.clientID,
    clientSecret: config.openID.clientSecret,
    callbackURL: config.openID.callbackURL
  },
  function(identifier, done) {
      console.log(identifier);
      console.log(done);
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));

/*passport.use(new OpenIdStrategy({
    clientID: config.openID.clientID,
    clientSecret: config.openID.clientSecret,
    returnURL: config.openID.callbackURL,
    realm: 'http://login.ordenadores.gt/openid-connect-server-webapp/'
  },
  //function(request,accessToken, refreshToken,profile, done) {
    function(identifier, done) {

        console.log(identifier);
        console.log(done);
    User.findByOpenID({ openId: identifier }, function (err, user) {
        return done(err, user);
      });
    /*console.log(profile.id)
    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
       
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));*/

// serialize user into the session
init();


module.exports = passport;