const mongoose = require("mongoose");

const petSubSchema = mongoose.Schema({
  name: { type: String },
  type: { type: String },
  adoptionStatus: { type: String },
  imageUrl: { type: String },
  ownedBy: { type: String },
});

const savePetSchema = mongoose.Schema({});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    bio: { type: String, required: false },
    petsOwned: [petSubSchema],
    petsSaved: [savePetSchema],
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
