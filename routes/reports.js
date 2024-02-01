const express = require("express");
const Report = require("../models/report.js");
const authUser = require("../middleware/authUser.js");
const adminRole = require("../middleware/adminRole.js");

const router = express.Router();

// POST - New report from form endpoint
router.post("/form", (req, res) => {
  Report.findOne({
    $and: [
      { streetNum: req.body.streetNum },
      { streetName: { $regex: req.body.streetName, $options: "i" } },
      { city: { $regex: req.body.city, $options: "i" } },
      { zipCode: req.body.zipCode },
    ],
  })
    .then((result) => {
      if (result) {
        res.status(400).send("Address reported in database");
        return;
      }

      let newReport = new Report(req.body);

      newReport
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

//  GET - Query reports with options
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

  Report.find(req.query.filter)
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

// DELETE - All reports
router.delete("/", authUser, adminRole, (req, res) => {
  Report.deleteMany()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// DELETE - Report by Id
router.delete("/:id", authUser, adminRole, (req, res) => {
  Report.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// PATCH - Update existing report
router.patch("/:id", authUser, adminRole, (req, res) => {
  Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => {
      res.status(200).send(result);
      console.log(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
