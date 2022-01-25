const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route GET /profiles/
// @desc Returns a list of all profiles
// @access Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({});
  res.status(200).json(profiles);
});

// @route GET /profiles/:id
// @desc Given an ID, return profile with that ID
// @access Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate("review")
      .populate("appointment");
    res.status(200).json(profile);
  } catch (e) {
    res.status(404).json("No profile with that id was found");
  }
});

// @route POST /profiles/create
// @desc  Given parameters passed in, create a profile.
// @access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const profile = new Profile({ user: req.user._id, ...req.body });

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (e) {
    console.log(e);
    res.status(422).send();
  }
});

// @route PUT /profiles/update/:id
// @desc Given an ID and new parameters, update the profile
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { new: true, runValidators: true },
    function (err, model) {
      if (err) {
        return res.status(422).send();
      }
      res.status(200).json(model);
    }
  );
});
