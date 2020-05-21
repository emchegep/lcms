const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const userSchema = new Schema({
  first_name: String,
  middle_name: String,
  last_name: String,
  gender: String,
  email: {
    type: String,
    unique: true
  },
  phone: String,
  password: String
});

userSchema.pre('save',function (next) {
  var user = this;

  //only hash the password if it has been modified
  if(!user.isModified("password")) {
    return next();
  }

  //generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash the password using the new salt
    bcrypt.hash(user.password, salt, function (err,hash) {
      if (err) {
        return next(err);
      }

      //overide the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err){
      return callback(err);
    }

    callback(undefined, isMatch);
  })
}
module.exports  = mongoose.model("user", userSchema,'users');
