var express = require('express');
var authRoutes = require('./auth');

const router = express.Router();

// mount user routes at /auth
router.use('/auth', authRoutes);

module.exports = router;