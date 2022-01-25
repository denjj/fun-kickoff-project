const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const loadUser = require("../middleware/user");
const {
  getAllProfiles,
  getProfile,
  updateProfile,
  createProfile,
} = require("../controllers/profile");

router.route("/").get(getAllProfiles);
router.route("/:id").get(getProfile);
router.route("/create").post(protect, loadUser, createProfile);
router.route("/update/:id").put(protect, loadUser, updateProfile);

module.exports = router;
