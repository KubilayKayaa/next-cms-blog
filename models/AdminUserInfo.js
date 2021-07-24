const mongoose = require("mongoose");

const AdminUserInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please add a username."],
    maxlength: [40, "Username cannot be more than 20 characters."],
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [50, "Email cannot be more than 50 characters."],
  },
  instagram: {
    type: String,
    maxlength: [50, "Email cannot be more than 50 characters."],
  },
  twitter: {
    type: String,
    maxlength: [50, "Email cannot be more than 50 characters."],
  },
  github: {
    type: String,
    maxlength: [50, "Email cannot be more than 50 characters."],
  },
});

module.exports =
  mongoose.models.AdminUserInfo ||
  mongoose.model("AdminUserInfo", AdminUserInfoSchema);
