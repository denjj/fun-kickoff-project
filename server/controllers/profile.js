const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({});
  res.status(200).json(profiles);
});

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
