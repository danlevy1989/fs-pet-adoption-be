const express = require("express");
const authController = require("../controllers/authController");
const { signUpSchema } = require("../schemas/allSchemas");
const { validateBody } = require("../middleware/validateBody");
const {
  passwordsMatch,
  isUserExist,
} = require("../middleware/signUpMiddleware");

const router = express.Router();

router.post(
  "/",
  validateBody(signUpSchema),
  passwordsMatch,
  isUserExist,
  authController.addUser
);


module.exports = router;