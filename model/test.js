const mongoose = require("mongoose");
const testM = mongoose.Schema({
  title:{type:String},
  
});
module.exports = mongoose.model("TestModel" , testM) 