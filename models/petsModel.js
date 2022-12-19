const mongoose = require("mongoose");

const petSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    adoptionStatus: { type: String, required: true },
    breed: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    color: { type: String, required: false },
    bio: { type: String, required: false },
    dietary: { type: String, required: false },
    hypoallergenic: { type: Boolean, required: false },
    ownedBy: { type: String, required: false },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
