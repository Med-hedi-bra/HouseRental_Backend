const express = require("express");
const app = express();
const stuffRoute = require("./routes/stuff");
const authRoute = require("./routes/auth");
const bp = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

// DB connection
mongoose
  .connect(process.env.MONGO_URL, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors());

app.use(bp.json());
app.use(
  session({
    // It holds the secret key for session
    secret: "I am a boy",

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: false,
    cookie: {},
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/apiStuff", stuffRoute);
app.use("/auth", authRoute);

module.exports = app;
