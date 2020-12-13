const router = require("express").Router();
const Customer = require("../connections/optician_1").model("Customer");
const mongoose = require("mongoose");

router.post("/newcustomer", function (req, res) {
  let newCustomer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    ssn: req.body.ssn,
  });

  newCustomer
    .save()
    .then((item) => {
      res.send("item saved to database");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("unable to save to database");
    });
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
