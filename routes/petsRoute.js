const express = require("express");
const petController = require("../controllers/petController");
const { addPetSchema } = require("../schemas/allSchemas");
const { validateBody } = require("../middleware/validateBody");
const { auth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");
const {
  upload,
  imageUrl,
  uploadToCloudinary,
} = require("../middleware/imagesMiddleware");

const router = express.Router();


router
  .route("/")
  .get(petController.getPetsBySearch)
  .post(
    auth,
    adminAuth,
    upload.single("petImage"),
    imageUrl,
    uploadToCloudinary,
    validateBody(addPetSchema),
    petController.addPet
  );



router
  .route("/:id")
  .put(auth, adminAuth, petController.editPetById)
  .get(petController.findPetByID);



router
  .route("/:id/save")
  .delete(auth, petController.deletePet)
  .post(auth, petController.savePet);

router.post("/:id/adopt", auth, petController.adoptPet);
router.post("/:id/return", auth, petController.returnPet);
router.get("/user/:id", auth, petController.getPetByUserId);

module.exports = router;
