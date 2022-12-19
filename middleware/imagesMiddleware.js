const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const upload = multer({ dest: "./images" });


const imageUrl = (req, res, next) => {
  try {
    console.log(req.file)
    if (req.file) {
      const imageUrl = "http://localhost:8080/" + req.file.path;
      req.body.imageUrl = imageUrl;
      next();
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send("Could not upload Image!");
  }
};

cloudinary.config({
  cloud_name: "dlwgc0jjo",
  api_key: "848998189933443",
  api_secret: "TcMnNgDPruOZm30TkW7QLsgEyS4",
});

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    next();
  } else {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        res.status(500).send("Could not upload Image to Cloudinary!");
        return;
      }
      if (result) {
        req.body.imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path);

        next();
        return;
      }
    });
  }
};

module.exports = { upload, imageUrl, uploadToCloudinary };
