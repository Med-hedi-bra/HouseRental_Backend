const express = require("express");
const router = express.Router();
const multerImage = require("../middleware/multerImage");
const StuffController = require("../controllers/stuff");
router.get("/", StuffController.showAllHouses);
router.post("/", multerImage, StuffController.addHouse)
router.get("/:id", StuffController.getHouseById);
// router.get('/pricemin/:pricemin/pricemax/:pricemax',StuffController.getHouseByPrice)
router.get("/price/interval", StuffController.getHouseByPrice1);
router.get("/categorie/:categorie", StuffController.getHouseByJustCategorie);
// router.get('/categorie/:categorie/type/:type',StuffController.getHouseByCategorie)
router.get("/filter/by", StuffController.getHouseByCategorie1);
router.get("/ville/:ville", StuffController.getHouseByVille);
router.put("/:id", StuffController.upDateHouse);
router.delete("/:id", StuffController.deleteHouse);
module.exports = router;
