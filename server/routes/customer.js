const router = require("express").Router();
const Customer = require("../connections/optician_1").model("Customer");
const mongoose = require("mongoose");
const Image = require("../connections/optician_1").model("Image");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put(
  "/newcustomerwithimage",
  upload.single("image"),
  function (req, res) {
    let customerData = {
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      ssn: req.body.SSN,
      certification_status: false,
    };
    if (req.file) {
      customerData.image = req.file.buffer;
    }

    let newCustomer = new Customer(customerData);
    newCustomer
      .save()
      .then((item) => {
        res.send("ok");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("unable to save to database");
      });
  }
);

router.post("/updatecertification", function (req, res) {
  Customer.findByIdAndUpdate(
    req.body._id,
    { certification_status: req.body.certification_status },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});

router.post("/newcustomer", function (req, res) {
  let newCustomer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    ssn: req.body.ssn,
    certification_status: false,
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
  Customer.find()
    .select("-image")
    .exec(function (err, customers) {
      if (err) return res.status(400).json({ error: "failed" });
      if (customers) {
        res.send(customers);
      }
    });
});

module.exports = router;
