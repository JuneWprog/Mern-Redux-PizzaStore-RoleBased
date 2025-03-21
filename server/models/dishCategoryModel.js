/**
 * Schema for DishCategory
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  imagePath: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
}, { versionKey: false });

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('DishCategory', categorySchema);