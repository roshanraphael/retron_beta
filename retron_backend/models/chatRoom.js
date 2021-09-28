const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const googleResults = {
  body: {
    type: String,
  },
};

const messageBody = {
  messageSender: {
    type: String,
    required: true,
  },
  mess: {
    type: String,
    required: true,
  },
  botResult: {
    type: String,
  },
};

const chatRoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    userHost: {
      type: ObjectId,
      ref: "User",
    },
    userAdded: [
      {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    ],
    message: {
      type: [messageBody],
    },
    gresults: {
      type: [googleResults],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("chatRoom", chatRoomSchema);
