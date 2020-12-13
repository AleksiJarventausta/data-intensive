const router = require("express").Router();
const Customer = require("../connections/optician_1").model("Customer");
const mongoose = require("mongoose");

router.post("/newuser", function (req, res) {
  const { user } = req.body;
  res.send(user);
});

// 8080/Customer
router.get("/", function (req, res) {
  Customer.findOne({ firstname: "testi1" }, function (err, user) {
    if (err) return res.status(400).json({ error: "failed" });
    if (user) {
      res.send(user);
    }
  });
});

module.exports = router;
