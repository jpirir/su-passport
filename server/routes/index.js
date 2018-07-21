var express = require('express');
var router = express.Router();

var oradb = require('../oracle/oradb');

var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');
var passportAzure = require('../auth/azure');
var passportOpenId = require('../auth/openid');

var bearerToken = require('express-bearer-token');

var jwt = require('jsonwebtoken');

var http = require('http');
 
var emp = [];
 


 //require the body-parser nodejs module
 //var bodyParser = require('body-parser');
 //require the path nodejs module
 //var path = require("path");



router.get('/', function (req, res, next) {


    if (req.user) {

        var socialId = '';

        switch(req.user.loginType) {
            case "MI":
                socialId = req.user.azureId;
                break;
            case "FB":
                socialId = req.user.facebookId;
                break;
            case "GH":
                socialId = req.user.githubId;
                break;
            case "GO":
                socialId = req.user.googleId;
                break;
            case "LI":
                socialId = req.user.linkedinId;
                break;
            case "OI":
                socialId = req.user.openidId;
                break;
            case "TW":
                socialId = req.user.twitterId;
                break;
        }


      /*  res.render('index', {
            title: 'Universales',
            message: 'Bienvenido',
            url: 'localhost:3000',
            user: req.user
        });*/

        console.log("go to dashboard");
        res.redirect("/dashboard");

       

    } else {
        res.render('login', {
            title: 'Universales',
            message: 'Iniciar sesión',
            url: 'localhost:3000'
        });
    }
});

router.get('/doSome', function(req, res, next){
    console.log("Doing the Post Operations....");


    var socialId = '';

    switch(req.user.loginType) {
        case "MI":
            socialId = req.user.azureId;
            break;
        case "FB":
            socialId = req.user.facebookId;
            break;
        case "GH":
            socialId = req.user.githubId;
            break;
        case "GO":
            socialId = req.user.googleId;
            break;
        case "LI":
            socialId = req.user.linkedinId;
            break;
        case "OI":
            socialId = req.user.openidId;
            break;
        case "TW":
            socialId = req.user.twitterId;
            break;
    }

    
    var request = require('request');

    console.log("-----------------------mongo data-------------------------------------");
    console.log(JSON.stringify(req.user));
    var email_ = JSON.parse(JSON.stringify(req.user.email));
    console.log(email_);
    console.log("-----------------------mongo data------------------------------------");
    
   var token = jwt.sign({ "sub": email_ , "userId":"", "role":"viApp" }, 'qwerewrewr', { algorithm: 'HS512' });
    
    //jwtBearerToken
    console.log("token :"+token);

    request.get(
        'http://localhost:8109/app/api/user/me', 
        {headers: { 'Authorization': "Bearer " +token }},
        function (error, response, body) {
            if (!error && (response.statusCode == 200 
                ||response.statusCode == 302)) {
                console.log(body);
                res.cookie("SESSIONID", token, {httpOnly:false, secure:true});
                res.redirect("/dashboard");
                

            }else{
                //console.log(error);
               // console.log(response);
               res.clearCookie("SESSIONID");
                console.log(response.statusCode);
                //console.log(body);
                res.redirect("/login");
            }
        }
    );

});

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Universales',
        message: 'Iniciar sesión',
        url: 'localhost:3000'
    });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        res.clearCookie("SESSIONID");
        res.redirect('/');
    });
});

router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
    passportLinkedIn.authenticate('linkedin', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/');
    });

router.get('/auth/github', passportGithub.authenticate('github', {scope: ['user:email']}));

router.get('/auth/github/callback',
    passportGithub.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/');
    });

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/');
    });

router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passportFacebook.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/doSome');
    });

router.get('/auth/google', passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/auth/google/callback',
    passportGoogle.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/doSome');
    });

router.get('/auth/azure',
    passportAzure.authenticate('azure_ad_oauth2'));

router.get('/auth/azure/callback',
    passportAzure.authenticate('azure_ad_oauth2', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/doSome');
    });

router.get('/auth/openid',
    passportOpenId.authenticate('openidconnect'));

router.get('/auth/openid/callback',
    passportOpenId.authenticate('openidconnect', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect("/doSome");
        
    });

module.exports = router;
