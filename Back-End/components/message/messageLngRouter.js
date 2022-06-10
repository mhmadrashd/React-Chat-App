const express = require("express");
const messageLngRouter = express.Router();
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

const subscribers = {};
//Get All Long Messages
messageLngRouter.get("/", async (req, res, next) => {
  try {
    const ID = Math.ceil(Math.random() * 10000);
    subscribers[ID] = res;
  } catch (error) {
    next(error);
  }
});

//Add new Long message
messageLngRouter.post("/", async (req, res, next) => {
  const { body } = req;
  try {

    const _id = await getMessageID();
    const message = body.message;
    const currSession = body.currSession;


    const messages = await MessageModel.find();

    await MessageModel.create({
      _id,
      message: body.message,
      currSession: body.currSession,
    });
    //Increment Message ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        message_ID: 1,
      },
    });

    Object.entries(subscribers).forEach(([ID, response]) => {
      response.json([...messages, { _id, message, currSession }]);
      delete subscribers[ID];
    })
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

//Edit message by ID
messageLngRouter.patch("/", async (req, res, next) => {
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

//Delete message by ID
messageLngRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await MessageModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = messageLngRouter;
