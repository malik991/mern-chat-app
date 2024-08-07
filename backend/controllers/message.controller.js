import conversationModel from "../models/conversession.model.js";
import { messageModel } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    //console.log(message, id, senderId);

    let conversation = await conversationModel.findOne({
      participient: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      // If no conversation is found, create a new one
      conversation = await conversationModel.create({
        participient: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage?._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // socket io functionality will go here

    // get the receiver socket id and emit the message
    const socketIdOfReceiver = getReceiverSocketId(receiverId);
    if (socketIdOfReceiver) {
      // only send to the specific client "to<socketId>.emit() event"
      io.to(socketIdOfReceiver).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.log("error in message endpoint: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participient: { $all: [senderId, userToChatId] },
      })
      .populate("messages"); // not reference but actual messages
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    return res.status(201).json(messages);
  } catch (error) {
    console.log("error in get message endpoint: ", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
