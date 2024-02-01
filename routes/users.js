const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST - User Registration Endpoint
router.post("/register", (req, res) => {
  User.findOne({ email: { $regex: req.body.email, $options: "i" } })
    .then((result) => {
      if (result) {
        res.status(400).send("Email already registered. Please login.");
        return;
      }

      let newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(newUser.password, 10);

      newUser
        .save()
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// POST - User Login Endpoint
router.post("/login", (req, res) => {
  User.findOne({ email: { $regex: req.body.email, $options: "i" } })
    .then((result) => {
      if (!result) {
        res.status(400).send("Invalid email/password");
      }

      bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
        if (bcresult) {
          let payLoad = {
            _id: result._id,
            role: result.role,
          };

          let token = jwt.sign(payLoad, process.env['JWT_KEY']);

          res.status(200).send({ jwt: token });
          console.log(payLoad);
        } else {
          res.status(400).send("Invalid email/password");
        }
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// GET - Read one user by ID
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not Found!");
      }
    })
    .catch((err) => {});
});

// POST - Create new user
router.post("/", (req, res) => {
  console.log("Pre new user");
  let newUser = new User(req.body);
  console.log("post new user");
  newUser
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// PATCH - Update existing user
router.patch("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// DELETE - Delete User
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// GET - Query users with options
router.get("/", (req, res) => {
  if (req.query.filter) {
    req.query.filter = JSON.parse(req.query.filter);
  }

  if (req.query.select) {
    req.query.select = JSON.parse(req.query.select);
  }

  if (req.query.sort) {
    req.query.sort = JSON.parse(req.query.sort);
  }

  let skip;
  if (req.query.skip) {
    skip = parseInt(req.query.skip);
  }

  let limit;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  User.find(req.query.filter)
    .select(req.query.select)
    .sort(req.query.sort)
    .skip(skip)
    .limit(limit)
    .exec()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
