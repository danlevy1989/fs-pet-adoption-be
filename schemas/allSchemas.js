const signUpSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6, maxLength: 14 },
    rePassword: { type: "string", minLength: 6, maxLength: 14 },
    phoneNumber: { type: "string", minLength: 10, maxLength: 16 },
  },
  required: [
    "firstName",
    "email",
    "lastName",
    "password",
    "rePassword",
    "phoneNumber",
  ],
  additionalProperties: false,
};

const addPetSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    breed: { type: "string" },
    adoptionStatus: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    bio: { type: "string" },
    dietary: { type: "string" },
    hypoallergenic: { type: "string" },
    imageUrl: { type: "string" },
  },
  required: ["type", "name", "adoptionStatus", "imageUrl"],
  additionalProperties: true,
};

module.exports = { signUpSchema, addPetSchema };
