const express = require("express");
const authController = require("../controllers/authController")
const router = express.Router();
const {
  isExistingUser,
  verifyPassword,
} = require("../middleware/loginMiddleware");

router.post("/", isExistingUser, verifyPassword, authController.authUser);

module.exports = router;
