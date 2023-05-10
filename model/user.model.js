const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

      resetPasswordToken: {
        type: String,
      },
      resetPasswordExpires: {
        type: Date,
      }


});

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
  });

module.exports = mongoose.model('UserModel', userSchema);
