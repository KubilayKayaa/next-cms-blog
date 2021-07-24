const mongoose = require("mongoose");

const AdminFileSchema = new mongoose.Schema({
  file: { type: Buffer, required: true },
});

module.exports =
  mongoose.models.AdminFile || mongoose.model("AdminFile", AdminFileSchema);
