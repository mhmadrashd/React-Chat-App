const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  message: {
    type: String,
    required: [true, "Please enter a message"],
  },
  currSession: {
    type: String,
  },
});

module.exports = messageSchema;
