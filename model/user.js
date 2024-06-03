const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, // Corrected from string to String
      required: false,
    },
    lastName: {
      type: String, // Corrected from string to String
    },
    email: {
      type: String, // Corrected from string to String
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    jobTitle: {
      type: String, // Corrected from string to String
    },
    gender: {
      type: String, // Corrected from string to String
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
