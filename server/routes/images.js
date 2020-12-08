const router = require("express").Router();
//const passport = require("passport");
const mongoose = require("mongoose");
const Image = require("../connections/optician_1").model("Image");

router.get("/", function (req, res) {
  Image.findOne({ name: "0001.dcm" }, function (err, image) {
    if (err) return res.status(400).json({ error: "failed" });
    if(image) {
        res.send(image.image);
    }
  });
});

module.exports = router;
