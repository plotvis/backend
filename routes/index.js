var router      = require('express').Router();
var jwt         = require('jsonwebtoken');
var config      = require('../config');
var multer      = require('multer');

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

/* Parse */
var parse = require('./parse');

router.get('/parse/', parse.parse);

/* Logs */
const logs = require('./logs');
// User CSV uploads
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/logs/upload', upload.single('csv'), logs.upload);
router.get('/logs', logs.all);


module.exports = router;
