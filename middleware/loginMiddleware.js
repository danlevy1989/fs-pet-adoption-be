const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

const isExistingUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("No user with this Email!");
  }
  req.body.user = user;
  next();
};

const verifyPassword = async (req, res, next) => {
  const { user, password } = req.body;
  if (await bcrypt.compare(password, user.password)) {
    next();
    return;
  }
  return res.status(400).send("Incorrect Password!");
};

module.exports = { isExistingUser, verifyPassword };
