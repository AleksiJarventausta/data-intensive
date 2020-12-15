const router = require("express").Router();
const Customer = require("../connections/optician_1").model("Customer");
const mongoose = require("mongoose");
const Image = require("../connections/optician_1").model("Image");
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const opth1 = require("../connections/opthal_1");
const opth2 = require("../connections/opthal_2");
const optician = require("../connections/optician_1");

const opthMap = new Map();
opthMap.set("opthal_1", opth1);
opthMap.set("opthal_2", opth2);
const allMap = new Map();
allMap.set("opthal_1", opth1);
allMap.set("opthal_2", opth2);
allMap.set("optician_1", opth2);



router.put(
  "/newcustomerwithimage",
  upload.single("image"),
  function (req, res) {
    let opth_db_key = getRandomKey(opthMap);
    let customerData = {
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      ssn: req.body.SSN,
      certification_status: false,
      ophthalmologist_db: opth_db_key,
    };
    if (req.file) {
      customerData.image = req.file.buffer;
    }

    let newCustomer = new Customer(customerData);
    newCustomer
      .save()
      .then((item) => {
        let ophth_db = opthMap.get(opth_db_key);
        let OpthCustomer = ophth_db.model("Customer");
        let opthCustomer = new OpthCustomer( customerData );
        opthCustomer
          .save()
          .then(() => res.send("ok"))
          .catch((err) => {res.status(400).send("unable to save to database")
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("unable to save to database");
      });
  }
);

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
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    allMap.get(req.user.own_db).model("Customer").find()
      .select("-image")
      .exec(function (err, customers) {
        if (err) return res.status(400).json({ error: "failed" });
        if (customers) {
          res.send(customers);
        }
      });
  }
);
function getRandomKey(collection) {
  let index = Math.floor(Math.random() * collection.size);
  let cntr = 0;
  for (let key of collection.keys()) {
    if (cntr++ === index) {
      return key;
    }
  }
}

module.exports = router;
