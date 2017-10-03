var passport = require('passport');
var AzureStrategy = require('passport-azure-ad-oauth2').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');





var jwt = require('jsonwebtoken');
/*passport.use(new AzureAdOAuth2Strategy({
  clientID: '{YOUR_CLIENT_ID}',
  clientSecret: '{YOUR_CLIENT_SECRET}',
  callbackURL: 'https://www.example.net/auth/azureadoauth2/callback',
  resource: '00000002-0000-0000-c000-000000000000',
  tenant: 'contoso.onmicrosoft.com'
},
function (accessToken, refresh_token, params, profile, done) {
  // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
  // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
  var waadProfile = profile || jwt.decode(params.id_token);

  // this is just an example: here you would provide a model *User* with the function *findOrCreate*
  User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
    done(err, user);
  });
}));*/

passport.use(new AzureStrategy({
    clientID: config.azure.clientID,
    clientSecret: config.azure.clientSecret,
    callbackURL: config.azure.callbackURL,
    //passReqToCallback   : true,
    resource: '00000002-0000-0000-c000-000000000000',
    //resource: 'https://graph.windows.net/',
    tenant: 'universales.com'
    //tenant: 'universales.com'
    //tenant: 'contoso.onmicrosoft.com'
  },
  /*function(accessToken, refreshToken, params, profile, done) {
    console.log(params);
    console.log(profile.id)
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
  }*/
  function (accessToken, refresh_token, params, profile, done) {
    // currently we can't find a way to exchange access token by user info (see userProfile implementation), so
    // you will need a jwt-package like https://github.com/auth0/node-jsonwebtoken to decode id_token and get waad profile
    var waadProfile = profile || jwt.decode(params.id_token);
  
    var profile_ = jwt.decode(params.id_token);
    console.log(waadProfile);
    console.log(profile);
    console.log(accessToken);
    console.log(refresh_token);
    console.log(params);

    console.log("-----------------");
    console.log( profile_);
    console.log(profile_.upn);
    console.log(profile_.oid);
    console.log("--------------------------");

 
    var searchQuery = {
      name: profile_.upn
    };

    var updates = {
      name: profile_.upn,
      someID: profile_.oid
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


));

// serialize user into the session
init();


module.exports = passport;