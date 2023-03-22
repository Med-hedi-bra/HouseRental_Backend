const express = require("express");
const app = express();
const session = require("express-session");
const stuffRoute = require("./routes/stuff");
const bp = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors")
// DB connection
mongoose
  .connect(
    "mongodb+srv://bra:12345m@cluster0.hbknp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// CORS 
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

app.use(cors())


app.use(bp.json());

app.use (
  session ({

      // It holds the secret key for session
      secret: "I am girl",

      // Forces the session to be saved
      // back to the session store
      resave: true,
        
        
      // Forces a session that is "uninitialized"
      // to be saved to the store
      saveUninitialized: false,
      cookie: {
  }})
);


app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/apiStuff", stuffRoute);
module.exports = app;
