const User = require("../models/usersModel");

const adminAuth = async (req, res, next) => {
  const user = await User.findById(req.user);

  if (user.isAdmin) {

    next();
    return;
  } else {
    res.status(401).send("You have no Admin Premissions!");
  }
};
module.exports = { adminAuth };
