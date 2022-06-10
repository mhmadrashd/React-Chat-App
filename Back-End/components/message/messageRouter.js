const express = require("express");
const messageRouter = express.Router();
const MessageModel = require("./messageModel");
const countersModel = require("../../assets/db/countersModel");
const { response } = require("express");

async function getMessageID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.message_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get Messages By currSession
messageRouter.get("/:currSession", async (req, res, next) => {
  const { currSession } = req.params;
  try {
    const message = await MessageModel.find({ currSession: currSession });
    res.send(message);
  } catch (error) {
    next(error);
  }
});

//Get All Messages
messageRouter.get("/", async (req, res, next) => {
  try {
    const message = await MessageModel.find();
    res.send(message);
  } catch (error) {
    next(error);
  }
});

//Edit message by ID
messageRouter.patch("/", async (req, res, next) => {
  const { id, message } = req.body;
  try {
    await MessageModel.findByIdAndUpdate(id, {
      $set: {
        message: message,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

//Add new message
messageRouter.post("/", async (req, res, next) => {
  const { message, currSession } = req.body;
  try {
    await MessageModel.create({
      _id: await getMessageID(),
      message,
      currSession,
    });
    //Increment Message ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        message_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

//Delete message by ID
messageRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await MessageModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = messageRouter;
