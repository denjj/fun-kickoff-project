const mongoose = require("mongoose");

const availableSchema = new mongoose.Schema({
  available: {
    type: Boolean,
    default: false,
  },
  start: Date,
  end: Date,
});

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  first_name: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "unspecified"],
    default: "unspecified",
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
  },
  phone_number: {
    type: Number,
    min: 999999999,
    max: 9999999999,
  },
  description: {
    type: String,
  },
  profile_picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile_picture",
  },
  isDogSitter: {
    type: Boolean,
    default: false,
  },
  days_available: {
    monday: availableSchema,
    tuesday: availableSchema,
    wednesday: availableSchema,
    thursday: availableSchema,
    friday: availableSchema,
    saturday: availableSchema,
  },
  price: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  reviews: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  appointments: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
