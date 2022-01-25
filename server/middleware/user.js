const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  req.user = user;
  next();
});

module.exports = loadUser;
