const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = AdminUser = mongoose.model("adminusers", AdminUserSchema);
