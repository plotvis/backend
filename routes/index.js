var router      = require('express').Router();
var jwt         = require('jsonwebtoken');
var config      = require('../config');

/**********************
 * UNPROTECTED ROUTES *
 **********************/

/* Auth */
var auth = require('./auth');
// Login
router.post('/auth/login', auth.login);
// Signup
router.post('/auth/signup', auth.signup);


/********************
 * PROTECTED ROUTES *
 *********************/

router.use(auth.verifyToken);

module.exports = router;
