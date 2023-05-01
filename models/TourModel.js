const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour MUst have a Name ...'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: [true, 'Tour Must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour Must have a groupSize'],
    },
    difficulty: {
      type: Number,
      required: [true, 'Tour Must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    priceDiscount: Number,
    summary: {
      type: String,
      trim: true, // it works for string only
      required: true,
    },
    description: {
      type: String,
      trim: true, // it works for string only
    },
    imageCover: {
      type: String,
      required: [true, 'Image is required'],
    },
    images: [String], // array of strings
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true }, // these are schema options
    toObject: { virtuals: true },
  }
);

// defining virtual properties, i.e those properties which are derived from one another
// they are implemented only when we get data from data base
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
