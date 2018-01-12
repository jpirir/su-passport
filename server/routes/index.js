var express = require('express');
var frontendRoutes = require('./frontend/index');
var apiRoutes = require('./api/index');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// mount frontend routes at /
router.use('/', frontendRoutes);

// mount api routes at /api
router.use('/api', apiRoutes);

module.exports = router;

// var passport = require('passport');
// var express = require('express');
// var router = express.Router();
// var jwt = require('jsonwebtoken');
// var oradb = require('../db/oradb');
// var userHelper = require('../helpers/user');
// var config = require("../config/config");
//
// var passportLinkedIn = require('../auth/linkedin');
// var passportGithub = require('../auth/github');
// var passportTwitter = require('../auth/twitter');
// var passportFacebook = require('../auth/facebook');
// var passportGoogle = require('../auth/google');
// var passportAzure = require('../auth/azure');
// var passportOpenId = require('../auth/openid');
// var passportCustom = require('../auth/custom');

// router.get('/', function (req, res, next) {
//
//     console.log('REQ req session ' + JSON.stringify(req.sessionID));
//     console.log('REQ req user id ' + JSON.stringify(req.user.id));
//
//     if (req.isAuthenticated()) {
//
//         var socialId = '';
//
//         switch (req.user.loginType) {
//             case "MI":
//                 socialId = req.user.social.azure
//                 break;
//             case "FB":
//                 socialId = req.user.social.facebook
//                 break;
//             case "GH":
//                 socialId = req.user.social.github
//                 break;
//             case "GO":
//                 socialId = req.user.social.google
//                 break;
//             case "LI":
//                 socialId = req.user.social.linkedin
//                 break;
//             case "OI":
//                 socialId = req.user.social.openid
//                 break;
//             case "TW":
//                 socialId = req.user.social.twitter
//                 break;
//         }
//
//         var userPromise = userHelper.getUserBySocialId(socialId, req.user.loginType);
//
//         userPromise.then(function (data) {
//             req.user.data = data;
//             if (Object.keys(req.user.data).length > 0) {
//                 res.render('index', {
//                     title: 'Universales',
//                     message: 'Bienvenido',
//                     url: 'localhost:3000',
//                     user: req.user
//                 });
//             } else {
//                 req.session.destroy();
//                 var err = new Error('El usuario no ha sido encontrado');
//                 err.status = 404;
//                 next(err);
//             }
//         });
//
//         userPromise.catch(function (err) {
//             console.log(err);
//             req.session.destroy();
//             var err = err;
//             err.status = 500;
//             next(err);
//         });
//
//     } else {
//         res.render('login', {
//             title: 'Universales',
//             message: 'Iniciar sesión',
//             url: 'localhost:3000'
//         });
//     }
// });
//
// router.get('/login', function (req, res, next) {
//     res.render('login', {
//         title: 'Universales',
//         message: 'Iniciar sesión',
//         url: 'localhost:3000'
//     });
// });

// router.post('/api/v1/login', function (req, res, next) {
//     // var sessionStore = config.sessionStore;
//     // sessionStore.get('asd', function(error, session){
//     //     return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: {sessionID:
//     // session.sessionID}}); });
//     if (req.isAuthenticated()) {
//         req.session.regenerate(function (err) {
//             if (err) {
//                 return res.status(500).json({type: "ERROR", msg: err.message});
//             }
//         });
//     }
//
//     passport.authenticate('custom', function (err, user, info) {
//
//         console.log(user);
//
//         res.setHeader('Content-Type', 'application/json');
//         if (err) {
//             return res.status(500).json({type: "ERROR", msg: err.message});
//         }
//
//         if (!user) {
//             return res.status(404).json({type: "ERROR", msg: "El usuario no existe"});
//         }
//
//         req.login(user, loginErr => {
//             if (loginErr) {
//                 return res.status(500).json({type: "ERROR", msg: loginErr.message});
//             }
//
//             var token = jwt.sign([req.user, req.sessionID], 'secret');
//
//             return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: {token: token}});
//         });
//     });
// });

// router.post('/api/v1/login', passport.authenticate('custom'), function (req, res, next) {
//
//     console.log(req.user);
//
//     res.setHeader('Content-Type', 'application/json');
//
//     var token = jwt.sign({id: req.user._id, sessionID: req.sessionID}, config.auth.secret);
//
//     return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: {token: token}});
// });
//
// router.get('/logout', function (req, res, next) {
//     req.session.destroy(function (err) {
//         res.redirect('/');
//     });
// });
//
// router.get('/api/v1/logout', function (req, res, next) {
//     req.session.destroy(function (err) {
//         if (err) {
//             return res.status(500).json({type: "ERROR", msg: err.message});
//         }
//         return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: {sessionID: req.sessionID}});
//     });
// });
//
// router.get('/api/v1/profile', function (req, res, next) {
//     try {
//         var user = userHelper.getUserByToken(req.get('x-auth-token'));
//         if(user) {
//             return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: user});
//         } else {
//             return res.status(404).json({type: "ERROR", msg: "El usuario no existe"});
//         }
//     } catch(err) {
//         return res.status(500).json({type: "ERROR", msg: err.message});
//     }
// });
//
// router.get('/api/v1/me', passport.authenticate('jwt', {session: false}), function(req, res, info) {
//     console.log('REQ req session ' + JSON.stringify(req.sessionID));
//     console.log('REQ req session ' + JSON.stringify(info.sessionID));
//
//     if (req.isAuthenticated()) {
//
//         var socialId = '';
//
//         switch (req.user.loginType) {
//             case "MI":
//                 socialId = req.user.social.azure
//                 break;
//             case "FB":
//                 socialId = req.user.social.facebook
//                 break;
//             case "GH":
//                 socialId = req.user.social.github
//                 break;
//             case "GO":
//                 socialId = req.user.social.google
//                 break;
//             case "LI":
//                 socialId = req.user.social.linkedin
//                 break;
//             case "OI":
//                 socialId = req.user.social.openid
//                 break;
//             case "TW":
//                 socialId = req.user.social.twitter
//                 break;
//         }
//
//         var userPromise = userHelper.getUserBySocialId(socialId, req.user.loginType);
//
//         userPromise.then(function (data) {
//             req.user.data = data;
//             if (Object.keys(req.user.data).length > 0) {
//                 return res.status(200).json({type: "SUCCESS", msg: 'OK', resultSet: req.user.data});
//             } else {
//                 return res.status(404).json({type: "ERROR", msg: "El usuario no existe"});
//             }
//         });
//
//         userPromise.catch(function (err) {
//             console.log(err);
//             req.session.destroy();
//             return res.status(500).json({type: "ERROR", msg: err.message});
//         });
//
//     } else {
//         return res.status(401).json({type: "ERROR", msg: "No tiene sesión"});
//     }
// });
//
// router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));
//
// router.get('/auth/linkedin/callback',
//     passportLinkedIn.authenticate('linkedin', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });
//
// router.get('/auth/github', passportGithub.authenticate('github', {scope: ['user:email']}));
//
// router.get('/auth/github/callback',
//     passportGithub.authenticate('github', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });
//
// router.get('/auth/twitter', passportTwitter.authenticate('twitter'));
//
// router.get('/auth/twitter/callback',
//     passportTwitter.authenticate('twitter', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });
//
// router.get('/auth/facebook', passportFacebook.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//     passportFacebook.authenticate('facebook', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });
//
// router.get('/auth/google', passportGoogle.authenticate('google', {
//     scope: ['https://www.googleapis.com/auth/plus.login',
//         'https://www.googleapis.com/auth/plus.profile.emails.read']
// }));
//
// router.get('/auth/google/callback',
//     passportGoogle.authenticate('google', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });
//
// router.get('/auth/azure',
//     passportAzure.authenticate('azure_ad_oauth2'));
//
// router.get('/auth/azure/callback',
//     passportAzure.authenticate('azure_ad_oauth2', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });
//
// router.get('/auth/openid',
//     passportOpenId.authenticate('openidconnect'));
//
// router.get('/auth/openid/callback',
//     passportOpenId.authenticate('openidconnect', {failureRedirect: '/login'}),
//     function (req, res) {
//         // Successful authentication
//         res.redirect('/');
//     });

module.exports = router;
