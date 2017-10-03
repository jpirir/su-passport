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

//erro look https://github.com/jaredhanson/passport-facebook/issues/210

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    enableProof: true
    /*,
    profileFields: ['id', 'displayName', 'photos', 'email']*/
  },

 

  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

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

      User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {

        console.log("------------------");
        console.log(err);
        console.log(user);
        console.log("------------------");
        
       if(err) {
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