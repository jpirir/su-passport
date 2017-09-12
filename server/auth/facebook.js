var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');


/*passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));*/

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
    /*,
    profileFields: ['id', 'displayName', 'photos', 'email']*/
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
        name: profile.id
      };
  
      var updates = {
        name: profile.displayName,
        someID: profile.id
      };
  
      var options = {
        upsert: true
      };

    

    User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
        console.log("user2"+profile.id);
        console.log("user2"+profile);
        if(err) {
            return done(err);
          } else {
            return done(null, user);
          }
      });

    /*var searchQuery = {
      name: profile.id
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
    });*/
  }

));

// serialize user into the session
init();


module.exports = passport;