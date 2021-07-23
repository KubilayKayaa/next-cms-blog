const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username."],
    unique: true,
    trim: true,
    maxlength: [20, "Username cannot be more than 20 characters."],
  },
  email: {
    type: String,
    required: [true, "Please add a email."],
    unique: true,
    trim: true,
    maxlength: [50, "Email cannot be more than 50 characters."],
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    trim: true,
    maxlength: [50, "Password cannot be more than 50 characters."],
  },
});

module.exports =
  mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
