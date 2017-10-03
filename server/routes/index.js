var express = require('express');
var router = express.Router();


var passportTwitter = require('../auth/twitter');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});



router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

var passportGithub = require('../auth/github');
  
  router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));
  
  router.get('/auth/github/callback',
    passportGithub.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication
      res.json(req.user);
    });


    var passportLinkedIn = require('../auth/linkedin');
    router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));
    
    router.get('/auth/linkedin/callback',
      passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication
        res.json(req.user);
      });


      var passportFacebook = require('../auth/facebook');
      router.get('/auth/facebook', passportFacebook.authenticate('facebook'));
      
      router.get('/auth/facebook/callback',
      passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
          // Successful authentication
          res.json(req.user);
        });

        var passportGoogle = require('../auth/google');
        router.get('/auth/google', passportGoogle.authenticate('google', { scope:
          [ 'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
      ));
        
        router.get('/auth/google/callback',
        passportGoogle.authenticate('google', { failureRedirect: '/login' }),
          function(req, res) {
            // Successful authentication
            res.json(req.user);
          });


          var passportAzure = require('../auth/azure');

        router.get('/auth/azure',
        passportAzure.authenticate('azure_ad_oauth2'));
        
        router.get('/auth/azure/callback', 
        passportAzure.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
          function (req, res) {
            // Successful authentication, redirect home.
            res.json(req.user);
            //res.redirect('/');
          });

   

          var passportOpenId = require('../auth/openid');
          
                  router.get('/auth/openid',
                  passportOpenId.authenticate('openidconnect'));
                  
                  router.get('/auth/openid/callback', 
                  passportOpenId.authenticate('openid', { failureRedirect: '/login' }),
                    function (req, res) {
                      // Successful authentication, redirect home.
                      //res.redirect('/');
                      res.json(req.user);
                    });


module.exports = router;
