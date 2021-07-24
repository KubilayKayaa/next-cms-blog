const mongoose = require("mongoose");

const AdminPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title."],
    trim: true,
    maxlength: [120, "Title cannot be more than 40 characters."],
  },
  description: {
    type: String,
    required: [true, "Please add a description."],
  },
  postImage: {
    type: String,
  },
  time: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

module.exports =
  mongoose.models.AdminPost || mongoose.model("AdminPost", AdminPostSchema);
