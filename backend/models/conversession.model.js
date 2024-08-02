import mongoose, { mongo, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participient: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;
