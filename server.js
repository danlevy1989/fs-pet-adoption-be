const express = require("express");
const userRoute = require("./routes/usersRoute");
const petsRoute = require("./routes/petsRoute");
const loginRoute = require("./routes/loginRoute");
const signUpRoute = require("./routes/signUpRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8070;
const app = express();

require("dotenv").config();
app.use("/images", express.static("images"));
app.use(express.json());
app.use(cors());
app.use("/signUp", signUpRoute);
app.use("/login", loginRoute);
app.use("/pet", petsRoute);
app.use("/user", userRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
