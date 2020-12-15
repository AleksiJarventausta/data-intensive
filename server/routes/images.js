const router = require("express").Router();
//const passport = require("passport");
const mongoose = require("mongoose");
const Image = require("../connections/optician_1").model("Image");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:customerID", function (req, res) {
  Image.findOne(
    { customer: mongoose.Types.ObjectId(req.params.customerID) },
    function (err, image) {
      if (err) return res.status(400).json({ error: "failed" });
      if (image) {
        res.send(image.image);
      } else {
        res.status(404).end();
      }
    }
  );
});

router.post("/:customerID", upload.single("image"), function (req, res) {
  const update = {
    image: req.file.buffer,
  };
  Image.findOneAndUpdate(
    { customer: mongoose.Types.ObjectId(req.params.customerID) },
    update,
    {
      upsert: true,
    },
    function (err, image) {
      if (err) return res.status(400).end();
      return res.end();
    }
  );
});

module.exports = router;
