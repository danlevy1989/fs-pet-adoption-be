const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
const { imageUrl } = require("../middleware/imagesMiddleware");
require("dotenv").config();

const addUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return res.status(200).send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    return res.status(400).send("Cannot Add User.");
  }
};

const authUser = async (req, res) => {
  const { user } = req.body;

  try {
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });


    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      petsSaved: user.petsSaved,
      petsOwned: user.petsOwned,
      phoneNumber: user.phoneNumber,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
      imageUrl: user.imageUrl,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { addUser, authUser };
