const mongoose = require("mongoose");
const houseThing = mongoose.Schema({
  title: {type:String},
  description: {type :String},
  phone: {type:String},
  categorie: {type:String}, 
  meuble : {type:Boolean},
  type: {type:String},
  ville:{type:String},
  price : {type:Number},
  imageUrl1:{type:String},
  imageUrl2:{type:String},
  imageUrl3:{type:String},
  imageUrl4:{type:String},
  imageUrl5:{type:String}
});
module.exports = mongoose.model("House", houseThing);
