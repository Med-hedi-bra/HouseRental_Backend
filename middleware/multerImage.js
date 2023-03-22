const multer = require("multer");
const MIMETYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0]; // cause the original name return name.extension
    const extension = MIMETYPES[file.mimetype];
    const newName = name.split(" ").join("_") + Date.now() + "." + extension;
    callback(null, newName);
  },
});
module.exports = multer({ storage: storage }).fields([
  { name: "img1" },
  { name: "img2" },
  { name: "img3" },
  { name: "img4" },
  { name: "img5" },
]); // it's necessary that the fildName = image and enctype=multipart/form-data

// to upload multiple file from the same field name we use multer.array(fieldName)
// to upload single file from the same field name we use multer.single(fieldName)
