var express = require('express');
var authRoutes = require('./auth');
var indexController = require('../../controllers/frontend/index.controller');

const router = express.Router();

/** GET / - Index */
router.route('/').get(indexController.index);

// mount user routes at /auth
router.use('/auth', authRoutes);

module.exports = router;