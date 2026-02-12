import { sendMessage, sendChatService, findOrCreateThread } from "../services/chat.service.js";

/**
 * POST /chat/send
 * Send a new message
 */
export const sendChatMessage = async (req, res) => {
  try {
    const { receiveId, message } = req.body;
    const senderId = req.user.id; // injected by auth middleware

    // Validate inputs
    if (!receiveId || !message) {
      return res.status(400).json({
        success: false,
        message: "receiveId and message are required"
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty"
      });
    }

    // Send message
    const newMessage = await sendChatService(senderId, receiveId, message);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error sending message"
    });
  }
};

/**
 * GET /chat/messages/:threadId
 * Get all messages in a thread
 */
export const getMessages = async (req, res) => {
  try {
    const { threadId } = req.params;
    const userId = req.user.id;

    // Validate threadId
    if (!threadId) {
      return res.status(400).json({
        success: false,
        message: "threadId is required"
      });
    }

    // Get messages
    const messages = await sendMessage(threadId);

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
      count: messages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching messages"
    });
  }
};

/**
 * GET /chat/thread/:userId1/:userId2
 * Get or create thread between two users
 */
export const getOrCreateThread = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    // Validate inputs
    if (!userId1 || !userId2) {
      return res.status(400).json({
        success: false,
        message: "Both userId1 and userId2 are required"
      });
    }

    // Find or create thread
    const threadDoc = await findOrCreateThread(userId1, userId2);

    res.status(200).json({
      success: true,
      message: "Thread found/created successfully",
      data: threadDoc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error creating/fetching thread"
    });
  }
};

/**
 * GET /chat/conversation/:receiveId
 * Get all messages with a specific user
 */
export const getConversation = async (req, res) => {
  try {
    const { receiveId } = req.params;
    const senderId = req.user.id;

    if (!receiveId) {
      return res.status(400).json({
        success: false,
        message: "receiveId is required"
      });
    }

    // Find or create thread
    const threadDoc = await findOrCreateThread(senderId, receiveId);

    // Get messages
    const messages = await sendMessage(threadDoc._id);

    res.status(200).json({
      success: true,
      message: "Conversation fetched successfully",
      data: {
        threadId: threadDoc._id,
        messages,
        messageCount: messages.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching conversation"
    });
  }
};

/**
 * GET /chat/threads
 * Get all threads for logged-in user
 */
export const getAllThreads = async (req, res) => {
  try {
    const userId = req.user.id;

    // This would need to be added to the service
    // For now, returning a basic response
    res.status(200).json({
      success: true,
      message: "Threads fetched successfully",
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching threads"
    });
  }
};
