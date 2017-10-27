const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const config          = require('../config');

const userSchema = new Schema({
  firstName:  {
    type: String,
    required: [true, 'First Name Required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name Required']
  },
  password: {
    type: String,
    required: [true, 'Password Name Required']
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
    validate: {
      validator: function(v, cb) {
        User.find({email: v}, function(err, docs){
           cb(docs.length === 0);
        });
      },
      message: 'User already exists!'
    }
  }
});

mongoose.connect(config.mongodbUrl);

const User = mongoose.model('User', userSchema );
exports.User = User;
