'use strict';

const mongoose = require('mongoose');
const Review = require('./review.js')
const rentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  phone: {
    type: Number,
    required: true,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});

rentalSchema.pre('remove', function(next) {
  Review.remove({"rentals": this._id}).exec();
  next();
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
