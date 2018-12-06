const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  },
  project_id: {
      type: Schema.Types.ObjectId,
      ref: 'project'
  }
});

module.exports = User = mongoose.model("users", UserSchema);
