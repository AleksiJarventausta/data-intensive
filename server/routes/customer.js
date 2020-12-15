const router = require("express").Router();
const Customer = require("../connections/optician_1").model("Customer");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  allMap,
  opthMap,
  OPTHAL_1,
  OPTHAL_2,
  OPTICIAN_1,
} = require("../connections/connectionMap");

const opth1 = require("../connections/opthal_1");
const opth2 = require("../connections/opthal_2");
const optician = require("../connections/optician_1");

router.post(
  "/updatecertification",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Customer.findByIdAndUpdate(
      req.body._id,
      { certification_status: req.body.certification_status },
      function (err, data) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        } else {
          console.log("Data updated!");
          if (req.user.own_db !== OPTICIAN_1) {
            opthMap
              .get(req.user.own_db)
              .model("Customer")
              .findByIdAndUpdate(
                req.body._id,
                { certification_status: req.body.certification_status },
                function (err, data) {
                  if (err) return res.status(400).end();
                  else {
                    res.send(data);
                  }
                }
              );
          } else {
            res.send(data);
          }
        }
      }
    );
  }
);

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
        let opthCustomer = new OpthCustomer(customerData);
        opthCustomer
          .save()
          .then(() => res.send("ok"))
          .catch((err) => {
            res.status(400).send("unable to save to database");
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
    allMap
      .get(req.user.own_db)
      .model("Customer")
      .find()
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
