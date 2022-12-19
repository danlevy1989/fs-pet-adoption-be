const Pet = require("../models/petsModel");
const User = require("../models/usersModel");
// 1 ----------------------------------------------------------------------------
const addPet = async (req, res) => {
  const {
    name,
    type,
    color,
    breed,
    adoptionStatus,
    height,
    weight,
    dietary,
    bio,
    hypoallergenic,
    imageUrl,
  } = req.body;
  try {
    const pet = await Pet.create({
      name,
      type,
      color,
      breed,
      adoptionStatus,
      height,
      weight,
      dietary,
      bio,
      hypoallergenic,
      imageUrl,
    });
    res.status(200).send({
      pet,
      message: `${pet.name} is succsesfully added to the Database.`,
    });
  } catch (err) {
    res.status(400).send("could not add pet.");
  }
};

// 2 ----------------------------------------------------------------------------
const getPetsBySearch = async (req, res) => {
  const query = {};
  let filteredWeight = {};
  let filteredHeight = {};

  const minW =
    req.query.minWeight && Number(req.query.minWeight) !== 0
      ? Number(req.query.minWeight)
      : 0;
  const maxW =
    req.query.maxWeight && Number(req.query.maxWeight) !== 0
      ? Number(req.query.maxWeight)
      : 1000;
  const minH =
    req.query.minHeight && Number(req.query.minHeight) !== 0
      ? Number(req.query.minHeight)
      : 0;
  const maxH =
    req.query.maxHeight && Number(req.query.maxHeight) !== 0
      ? Number(req.query.maxHeight)
      : 1000;

  filteredWeight = { weight: { $gte: minW, $lte: maxW } };
  filteredHeight = { height: { $gte: minH, $lte: maxH } };

  if (minW === 0 && maxW === 1000) {
    filteredWeight = {};
  }

  if (minH === 0 && maxH === 1000) {
    filteredHeight = {};
  }

  if (req.query.type) {
    query.type = req.query.type;
  }

  if (req.query.name) {
    let nameRegx = new RegExp(`${req.query.name}`);
    query.name = { $regex: nameRegx, $options: "gi" };
  }

  if (req.query.adoptionStatus) {
    query.adoptionStatus = req.query.adoptionStatus;
  }

  try {
    const pet = await Pet.find({
      ...query,
      ...filteredHeight,
      ...filteredWeight,
    });

    return res.status(200).send({ pet, results: pet.length });
  } catch (error) {
    res.status(500).send(err);
  }
};

// 3 ----------------------------------------------------------------------------
// admin only
const editPetById = async (req, res) => {
  const toUpdate = {};

  for (const property in req.body) {
    if (req.body[property].length > 0) {
      toUpdate[property] = req.body[property];
    }
  }

  try {
    const updatedpet = await Pet.findByIdAndUpdate(req.params.id, toUpdate, {
      new: true,
    }).select({ createdAt: 0, __v: 0, updatedAt: 0 });

    res
      .status(200)
      .send({ updatedpet, message: "Pet details updated succsesfully" });
  } catch (err) {
    res.status(400).send("could not update Pet details");
  }
};

// 4 ----------------------------------------------------------------------------

const adoptPet = async (req, res) => {
  try {
    const userPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { adoptionStatus: req.body.action, ownedBy: req.user },
      {
        new: true,
      }
    ).select({ imageUrl: 1, adoptionStatus: 1, name: 1, type: 1, ownedBy: 1 });

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $addToSet: { petsOwned: userPet } },
      {
        new: true,
      }
    ).select({ createdAt: 0, __v: 0, updatedAt: 0 });

    res.status(200).send({ user: updatedUser, pet: userPet });
  } catch (err) {
    res.status(400).send(err);
  }
};
// 5 ----------------------------------------------------------------------------
const returnPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).select({
      imageUrl: 1,
      adoptionStatus: 1,
      name: 1,
      type: 1,
      ownedBy: 1,
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $pull: { petsOwned: pet } },
      {
        new: true,
      }
    ).select({ createdAt: 0, __v: 0, updatedAt: 0 });

    const returnedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { adoptionStatus: "Available", ownedBy: "" },
      {
        new: true,
      }
    ).select({ imageUrl: 1, adoptionStatus: 1, name: 1, type: 1, ownedBy: 1 });

    res.status(200).send({ user: updatedUser, pet: returnedPet });
  } catch (err) {
    console.log(err);
  }
};

// 6 ----------------------------------------------------------------------------
const savePet = async (req, res) => {
  try {
    const savedPet = await Pet.findById(req.params.id).select({
     _id: 1
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $addToSet: { petsSaved: savedPet } },
      {
        new: true,
      }
    ).select({ createdAt: 0, __v: 0, updatedAt: 0, password: 0 });

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send("Could not save this pet");
  }
};

// 7 ----------------------------------------------------------------------------

const deletePet = async (req, res) => {
  try {
    const deletedSavedPet = await Pet.findById(req.params.id).select({
      _id: 1
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $pull: { petsSaved: deletedSavedPet } },
      {
        new: true,
      }
    ).select({ createdAt: 0, __v: 0, updatedAt: 0, password: 0 });

   
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send("Could not unsave this pet");
  }
};

// 8 ----------------------------------------------------------------------------

const getPetByUserId = async (req, res) => {
  try {
    const usersPets = await User.findById(req.params.id).select({
      petsSaved: 1,
      petsOwned: 1,
    });
    res.status(200).send(usersPets);
  } catch (err) {
    res.status(400).send("could not retrive user pets.");
  }
};

// 9----------------------------------------------------------------------------

const findPetByID = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).select({
      createdAt: 0,
      __v: 0,
      updatedAt: 0,
    });

    res.status(200).send(pet);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addPet,
  findPetByID,
  getPetsBySearch,
  editPetById,
  returnPet,
  adoptPet,
  getPetByUserId,
  savePet,
  deletePet,
};
