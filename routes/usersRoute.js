const express = require("express");
const userController = require("../controllers/userController");
const {
  passwordsMatch,
  isEmailInUse,
} = require("../middleware/signUpMiddleware");
const { auth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");
const {
  upload,
  imageUrl,
  uploadToCloudinary,
} = require("../middleware/imagesMiddleware");

const router = express.Router();

router
  .route("/:id")
  .get(userController.getUserById)
  .put(
    isEmailInUse,
    passwordsMatch,
    upload.single("profileImage"),
    imageUrl,
    uploadToCloudinary,
    auth,
    userController.updateUserById
  );

router.get("/", auth, adminAuth, userController.getAllUsers);
router.get("/:id/full", userController.getFullUserById);

module.exports = router;
