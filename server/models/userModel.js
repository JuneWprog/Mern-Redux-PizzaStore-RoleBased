/**
 * Schema for user
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
    enum : ['User','Admin'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  mobileNumber: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);