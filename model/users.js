const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const user = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, require: true },
});
user.plugin(uniqueValidator)
module.exports = mongoose.model("User" , user)