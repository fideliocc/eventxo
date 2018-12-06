const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  platform: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = Project = mongoose.model("project", ProjectSchema);
