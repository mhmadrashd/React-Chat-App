const mongoose = require("mongoose");
const messageSchema = require("./messageSchema");

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
