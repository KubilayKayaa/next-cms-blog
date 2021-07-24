const mongoose = require("mongoose");

const AdminCommentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please add a title."],
    maxlength: [120, "Title cannot be more than 40 characters."],
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    maxlength: [120, "Title cannot be more than 40 characters."],
  },
  comment: {
    type: String,
    required: [true, "Please add a description."],
  },
  time: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  postId: { type: String },
  test: { type: String, default: "test" },
});

module.exports =
  mongoose.models.AdminComment ||
  mongoose.model("AdminComment", AdminCommentSchema);
