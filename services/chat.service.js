import chat from "../models/chat.js";
import thread from "../models/thread.js";

export const sendMessage = async (threadId, userId) => {
    const threadDoc = await thread.findById(threadId);
    if (!threadDoc) {
        throw new Error("Thread not found");
    }

    const isParticipant = threadDoc.participants
        .map((id) => id.toString())
        .includes(userId.toString());

    if (!isParticipant) {
        throw new Error("Not authorized");
    }

    return await chat.find({ thread: threadId })
        .populate("sender", "name email")
        .sort({ createdAt: 1 });
};

export const sendChatService = async (senderId, receiveId, message) => {
    if (senderId.toString() === receiveId.toString()) {
        throw new Error("Cannot send message to yourself");
    }

    const threadDoc = await findOrCreateThread(senderId, receiveId);
    const newChat = await chat.create({
        thread: threadDoc._id,
        sender: senderId,
        message
    });

    await thread.findByIdAndUpdate(threadDoc._id, { lastMessage: message });

    return await newChat.populate("sender", "name email");
};

export const findOrCreateThread = async (userId1, userId2) => {
    const participants = [userId1, userId2].sort();

    let threadDoc = await thread.findOne({
        participants: { $all: participants, $size: 2 }
    });

    if (!threadDoc) {
        threadDoc = await thread.create({ participants });
    }
    return threadDoc;
};

export const getThreadsForUser = async (userId) => {
    const threads = await thread
        .find({ participants: userId })
        .populate("participants", "name email role")
        .sort({ updatedAt: -1 });

    return threads;
};







