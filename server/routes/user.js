const router = require("express").Router();
const User = require("../connections/systemDB").model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var registerValidation = require("../validation/validateRegistration");
var loginValidation = require("../validation/validateLogin");
const mongoose = require("mongoose");
const passport = require("passport");
const opth1 = require("../connections/opthal_1");
const opth2 = require("../connections/opthal_2");
const optician = require("../connections/optician_1");

const {allMap, opthMap, OPTHAL_1, OPTHAL_2, OPTICIAN_1} = require('../connections/connectionMap')

function getRandomKey(collection) {
  let index = Math.floor(Math.random() * collection.size);
  let cntr = 0;
  for (let key of collection.keys()) {
    if (cntr++ === index) {
      return key;
    }
  }
}

function sendJwtToken(res, payload) {
  jwt.sign(
    payload,
    process.env.secretOrKey,
    {
      expiresIn: 31556926, // 1 year in seconds
    },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );
}

function saveUser(req, res) {
  bcrypt.compare(req.body.password, req.user.password).then((isMatch) => {
    if (isMatch) {
      if (req.body.newpassword1) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(registeringUser.password, salt, (err, hash) => {
            if (err) throw err;
            req.user.password = hash;
            req.user
              .save()
              .then((user) => {
                const payload = {
                  id: req.user._id,
                  username: req.user.username,
                  profession: user.profession
                };
                // Sign token
                sendJwtToken(res, payload);
              })
              .catch((err) =>
                res.json({ error: "failed to update user info." })
              );
          });
        });
      } else {
        req.user
          .save()
          .then((user) => {
            const payload = {
              id: req.user._id,
              username: req.user.username,
              profession: user.profession
            };
            // Sign token
            sendJwtToken(res, payload);
          })
          .catch((err) => {
            let o = err;
            res.json({ error: "failed to update user info." });
          });
      }
    } else {
      return res.status(400).json({ password: "Wrong password" });
    }
  });
}

router.post("/login", function (req, res) {
  const { errors, isValid } = loginValidation(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(400).json({ username: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user._id,
          username: user.username,
          profession: user.profession
        };
        // Sign token
        sendJwtToken(res, payload);
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const { errors, isValid } = updateValidation(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (
      req.body.additional !== undefined &&
      req.body.additional !== req.user.additional
    ) {
      req.user.additional = req.body.additional;
    }
    let name;
    let newName = false;
    if (
      req.body.username !== undefined &&
      req.body.username !== req.user.username &&
      req.body.username !== ""
    ) {
      name = req.body.username;
      newName = true;
    } else {
      name = req.user.username;
      newName = false;
    }
    User.findOne({ username: name }, function (err, user) {
      if (err) return res.status(400).json({ error: "failed" });
      if (user && newName) {
        return res.status(400).json({ username: "Username already in use" });
      } else {
        req.user.username = name;
        saveUser(req, res);
      }
    });
  }
);

router.post("/register", function (req, res) {
  let { errors, isValid } = registerValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      return res.status(400).json({ username: "Username already in use." });
    } else {
      let own_db = ""
      if (req.body.profession == 1) {
        own_db = "optician_1"
      } else {
        own_db = getRandomKey(opthMap);
      }

      let registeringUser = new User({
        username: req.body.username,
        password: req.body.password,
        profession: req.body.profession,
        own_db: own_db,
        _id: new mongoose.Types.ObjectId(),
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(registeringUser.password, salt, (err, hash) => {
          if (err) throw err;
          registeringUser.password = hash;
          registeringUser
            .save()
            .then((user) => res.send("ok"))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
