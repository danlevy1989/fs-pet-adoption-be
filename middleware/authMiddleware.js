var jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = req.headers.authorization.replace("bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }
    if (decoded) {
      req.user = decoded.id;

      next();
      return;
    }
  });
};

module.exports = { auth };
