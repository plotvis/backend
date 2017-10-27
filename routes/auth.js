var MongoClient = require('mongodb').MongoClient;
var config      = require('../config');
var crypto      = require('crypto');
var bcrypt      = require('bcrypt');
var jwt         = require('jsonwebtoken');
var saltRounds  = 10;
var url         = config.mongodbUrl;
const UserModel = require('../models/user.js').User;
const mongoose  = require('mongoose');
mongoose.connect(url);

function exists(query) {
    if (typeof query !== 'undefined' && query !== null){
       return true;
   } else {
       return false;
   }
}

// POST /auth/login
var login = function(req, res) {
  if (exists(req.body.email) && exists(req.body.password)) {
    UserModel.findOne({email: req.body.email}, function(err, user) {
      if(!user) {
        res.json({success: false, message: 'Invalid credentials'});
        return;
      }

      bcrypt.compare(req.body.password, user.password, function(err, match) {
          if(!match) {
              res.json({success: false, message: 'Invalid credentials'});
          } else {
              var inToken = {
                  _id: user._id
              };
              var token = jwt.sign(inToken, config.secret, {
                  expiresIn: 86400 // expires in 24 hours
              });
              res.json({ success: true, token: token, message: '' });
          }
      });
    });
  } else {
      res.json({ success: false, message: 'Please supply all fields' });
      return;
  }
};

// Expects email, password, app name
// POST /auth/signup
var signup = function(req, res) {
  let newUser = new UserModel();
  newUser.email = req.body.email;
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;

  encrypt(req.body.password, function(err, hash) {
    newUser.password = hash;
    newUser.validate(function(errors) {
      if (!errors) {
        newUser.save(function() {
          res.json({success:true})
        });
      } else {
        res.json({success: false, message: errors});
      }
    });
  });
};

// Middleware to verify token
var verifyToken = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.header('token');
   //  con/sole.log(token);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.', loggedIn: false });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

function encrypt(password, callback) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        callback(err, hash);
    });
}

function getToken(len) {
    return crypto.randomBytes(len).toString('hex');
}

var functions = {
    login: login,
    signup: signup,
    verifyToken: verifyToken
};

module.exports = functions;
