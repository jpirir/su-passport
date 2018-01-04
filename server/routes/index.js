var express = require('express');
var router = express.Router();

var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');
var passportAzure = require('../auth/azure');
var passportOpenId = require('../auth/openid');

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('index', {
            title: 'Universales',
            message: 'Bienvenido',
            url: 'localhost:3000',
            user: req.user
        });
        //TODO: Add oracle database integration
    } else {
        res.render('login', {
            title: 'Universales',
            message: 'Iniciar sesión',
            url: 'localhost:3000'
        });
    }
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
        res.redirect('/');
    });

router.get('/auth/google', passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/auth/google/callback',
    passportGoogle.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/');
    });

router.get('/auth/azure',
    passportAzure.authenticate('azure_ad_oauth2'));

router.get('/auth/azure/callback',
    passportAzure.authenticate('azure_ad_oauth2', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/');
    });

router.get('/auth/openid',
    passportOpenId.authenticate('openidconnect'));

router.get('/auth/openid/callback',
    passportOpenId.authenticate('openidconnect', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication
        res.redirect('/');
    });

module.exports = router;
