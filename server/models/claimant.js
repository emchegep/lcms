const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const claimantSchema = new Schema({
  name: Object,
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  resident: Object,
  case: Object,
  defendant: [Object],
  witness: [Object],
  lawyer:[Object],
  progress: [Object],
  created_date: Date,
  updated_date: Date,
  status: Boolean,
  judgement: String
});

claimantSchema.pre('save',function (next) {
  var claimant = this;

  //only hash the password if it has been modified
  if(!claimant.isModified("password")) {
    return next();
  }

  //generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash the password using the new salt
    bcrypt.hash(claimant.password, salt, function (err,hash) {
      if (err) {
        return next(err);
      }

      //overide the cleartext password with the hashed one
      claimant.password = hash;
      claimant.created_date = Date.now();
      claimant.updated_date = Date.now();
      claimant.status = true;
      next();
    });
  });
});

claimantSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err){
      return callback(err);
    }

    callback(undefined, isMatch);
  })
}

claimantSchema.pre('', function (next) {
  var claimant = this;

  //only hash the password if it has been modified
  if(!claimant.isModified("password")) {
    return next();
  }

  //generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash the password using the new salt
    bcrypt.hash(claimant.password, salt, function (err,hash) {
      if (err) {
        return next(err);
      }

      //overide the cleartext password with the hashed one
      claimant.password = hash;
      claimant.updated_date = Date.now();
      next();
    });
  });
});
module.exports  = mongoose.model("claimant", claimantSchema,'claimants');
