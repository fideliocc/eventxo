const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  },
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
  country: {
    type: String,
    required: true
  },
  grade: {
    type: String
  },
  bio: {
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
  },
});

module.exports = Speaker = mongoose.model("speaker", SpeakerSchema);
