var express = require('express');
var validate = require('express-validation');
var paramValidation = require('../../config/param-validation');
var authController = require('../../controllers/api/auth.controller');

const router = express.Router();

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(validate(paramValidation.login), authController.login);

module.exports = router;