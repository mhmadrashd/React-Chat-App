const mongoose = require("mongoose");

const countersIDSchema = new mongoose.Schema({
  _id: "number",
  message_ID: "number",
});
module.exports = countersIDSchema;
