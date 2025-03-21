/**
 * Schema for Dish
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DishCategory'
  },
  imagePath: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  spice: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot', 'None'],
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

dishSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Dish', dishSchema);