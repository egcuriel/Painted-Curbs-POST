const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["SUBMITTED", "OPEN", "CLOSED"],
    default: "SUBMITTED",
    required: true,
  },
  details: {
    type: String,
    maxLength: 300,
    default: "N/A",
    required: true,
  },
  curbColor: {
    type: String,
    required: true,
  },
  streetNum: {
    type: Number,
    maxLength: 5,
    required: true,
  },
  streetDirection: {
    type: String,
  },
  streetName: {
    type: String,
    required: true,
  },
  streetType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    maxLength: 20,
    required: true,
  },
  zipCode: {
    type: Number,
    maxLength: 10,
    match: /^\d{5}$/,
    required: true,
  },
  latitude: {
    type: Number,
    maxLength: 19,
    // match:
    //   /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
  },
  longitude: {
    type: Number,
    maxLength: 19,
    // match:
    //   /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  createdBy: {
    type: String,
    default: "anonymous",
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedBy: {
    type: String,
    default: "N/A",
    required: true,
  },
});

module.exports = mongoose.model("Report", reportSchema);
