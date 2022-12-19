const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

const getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id).select({
      firstName: 1,
      petsSaved: 1,
      petsOwned: 1,
    });

    return res.status(200).send(userById);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getFullUserById = async (req, res) => {
  try {
    const FullUserById = await User.findById(req.params.id, {
      createdAt: 0,
      __v: 0,
      updatedAt: 0,
    });

    return res.status(200).send(FullUserById);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select({
      createdAt: 0,
      __v: 0,
      updatedAt: 0,
      token: 0,
      password: 0,
    });

    return res.status(200).send(allUsers);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const updateUserById = async (req, res) => {
  const toUpdate = {};

  const { password } = req.body;

  if (password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
  }

  for (const property in req.body) {
    if (req.body[property].length > 0) {
      toUpdate[property] = req.body[property];
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, toUpdate, {
      new: true,
    }).select({
      createdAt: 0,
      __v: 0,
      updatedAt: 0,
    });

    res
      .status(200)
      .send({ updatedUser, message: "Your details updated succsesfully" });
  } catch (err) {
    return res.status(400).send("Could not update details");
  }
};

module.exports = { getFullUserById, updateUserById, getUserById, getAllUsers };
