const User = require("../models/usersModel");

const passwordsMatch = (req, res, next) => {
  const { password, rePassword } = req.body;

  if (password !== rePassword) {
    return res.status(400).send("Passwords don't match!");
  }

  next();
};

const isUserExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).send("Email allready in use!");
  }

  next();
};

const isEmailInUse = async (req, res, next) => {
  const { email } = req.body;

  const currentUserEmail = await User.findById(req.params.id).select({
    email: 1,
  });

  const user = await User.findOne({ email }).select({ email: 1 });

  if (user && user.email !== currentUserEmail.email) {
    return res.status(400).send("Email allready in use!");
  }

  next();
  return;
};

module.exports = { passwordsMatch, isUserExist, isEmailInUse };
