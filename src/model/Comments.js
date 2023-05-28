const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: String,
  author: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true
  },

  photoPub: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
