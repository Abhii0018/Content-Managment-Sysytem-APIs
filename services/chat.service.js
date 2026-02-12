import chat from "../models/chat.js";
import thread from "../models/thread.js";

export const sendMessage = async (threadId) => {
  return await chat.find({thread:threadId})
  .populate("sender", "name email")
  .sort({ createdAt: 1 });
};

export const sendChatService = async (senderId, receiveId, message) => {
    const threadDoc = await findOrCreateThread(senderId, receiveId);
    const newChat = await chat.create({
        thread: threadDoc._id,
        sender: senderId,
        message
    });
    return await newChat.populate("sender", "name email");
};

export const findOrCreateThread = async (userId1, userId2) => {

    const participants = [userId1, userId2].sort(); // Sort to ensure consistent order

    let threadDoc = await thread.findOne({participants: {$all: participants, $size: 2}});

    if(!threadDoc){
        threadDoc = await thread.create({participants});
    }
    return threadDoc;
};   







