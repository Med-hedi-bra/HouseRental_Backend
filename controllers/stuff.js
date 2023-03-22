const House = require("../model/house");

exports.addHouse = (req, res, next) => {
  const houseObject = req.body;
  const newHouse = new House({
    ...houseObject,

    imageUrl1:
      req.files != undefined
        ? req.files.img1 
          ? `${req.protocol}://${req.get("host")}/images/${
              req.files.img1[0].filename
            }`
          : null
        : null,

        imageUrl2:
        req.files != undefined
          ? req.files.img2 
            ? `${req.protocol}://${req.get("host")}/images/${
                req.files.img2[0].filename
              }`
            : null
          : null,
          imageUrl3:
          req.files != undefined
            ? req.files.img3
              ? `${req.protocol}://${req.get("host")}/images/${
                  req.files.img3[0].filename
                }`
              : null
            : null,
            imageUrl4:
            req.files != undefined
              ? req.files.img4 
                ? `${req.protocol}://${req.get("host")}/images/${
                    req.files.img4[0].filename
                  }`
                : null
              : null,
              imageUrl5:
              req.files != undefined
                ? req.files.img5 
                  ? `${req.protocol}://${req.get("host")}/images/${
                      req.files.img5[0].filename
                    }`
                  : null
                : null,
    
  });
  // if i upload single file i acces to the file by  req.file  else req.files
  newHouse
    .save()
    .then(() => {
      res.status(201).json({ message: "Object succesfully created " });
    })
    .catch((err) => {
      res.status(401).json({ err: "mibuun" });
      console.log('mostfa')
    });
};

exports.showAllHouses = (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  House.find()
    .then((data) => {
      res.status(202).json({ data: data, views: req.session.views });
    })
    .catch((err) => res.status(402).json({ err: err }));
};

exports.getHouseById = (req, res, next) => {
  House.findById(req.params.id)
    .then((data) => {
      res.status(203).json(data);
    })
    .catch((err) => res.status(403).json({ err: err }));
};
exports.getHouseByJustCategorie = (req, res, next) => {
  House.find({ categorie: req.params.categorie })
    .then((data) => {
      res.status(203).json(data);
    })
    .catch((err) => res.status(403).json({ err: err }));
};

exports.getHouseByPrice = (req, res, next) => {
  House.find({
    price: { $gte: req.params.pricemin, $lte: req.params.pricemax },
  })
    .then((data) => res.status(203).json(data))
    .catch((err) => res.status(403).json({ err: err }));
};

exports.getHouseByPrice1 = (req, res, next) => {
  House.find({
    price: { $gte: req.query.pricemin, $lte: req.query.pricemax },
  })
    .then((data) => res.status(203).json(data))
    .catch((err) => res.status(403).json({ err: err }));
};

exports.getHouseByCategorie = (req, res, next) => {
  House.find({
    $and: [{ categorie: req.params.categorie }, { type: req.params.type }],
  })
    .then((data) => res.status(203).json(data))
    .catch((err) => res.status(403).json({ err: err }));
};

exports.getHouseByCategorie1 = (req, res, next) => {
  House.find({
    $and: [
      { categorie: req.query.categorie },
      { type: req.query.type.replace(" ", "+") },
    ],
  })
    .then((data) => res.status(203).json(data))
    .catch((err) => res.status(403).json({ err: err }));
};

exports.getHouseByVille = (req, res, next) => {
  House.find({ ville: req.params.ville })
    .then((data) => res.status(203).json(data))
    .catch((err) => res.status(403).json({ err: err }));
};

exports.upDateHouse = (req, res, next) => {
  House.updateOne(
    { _id: req.params.id },
    {
      $set: {
        // _id: req.params.id,
        // imageUrl1: req.files.image1
        //   ? `${req.protocol}://${req.get("host")}/images/${
        //       req.files.image1[0].filename
        //     }`
        //   : null,
        // imageUrl2: req.files.image2
        //   ? `${req.protocol}://${req.get("host")}/images/${
        //       req.files.image2[0].filename
        //     }`
        //   : null,
        // imageUrl3: req.files.image3
        //   ? `${req.protocol}://${req.get("host")}/images/${
        //       req.files.image3[0].filename
        //     }`
        //   : null,
        // imageUrl4: req.files.image4
        //   ? `${req.protocol}://${req.get("host")}/images/${
        //       req.files.image4[0].filename
        //     }`
        //   : null,
        // imageUrl5: req.files.image5
        //   ? `${req.protocol}://${req.get("host")}/images/${
        //       req.files.image5[0].filename
        //     }`
        //   : null,
        title: req.body.title,
      },
    }
  )
    .then(() =>
      res.status(204).json({ messages: "Object successfully updated" })
    )
    .catch((err) => res.status(404).json(err));
};

exports.deleteHouse = (req, res, next) => {
  House.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(205).json({ message: "Object successfully deleted" })
    )
    .catch((err) => res.status(405).json(err));
};
