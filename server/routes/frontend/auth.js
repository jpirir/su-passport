var express = require('express');
var passport = require('passport');
var authController = require('../../controllers/frontend/auth.controller');

require('../../helpers/auth/linkedin');

const router = express.Router();

router.route('/').get(authController.load);

router.route('/logout').get(authController.destroy);

router.route('/linkedin').get(passport.authenticate('linkedin'));

router.route('/linkedin/callback')
    .get(passport.authenticate('linkedin', {failureRedirect: '/auth'}), (req, res) => {
        res.redirect('/');
    });

module.exports = router;