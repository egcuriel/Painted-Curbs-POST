const mongoose = require("mongoose");

// Schema for the user collection
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength: 15,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    maxLength: 30,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
