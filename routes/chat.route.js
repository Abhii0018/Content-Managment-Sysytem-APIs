import express from "express";
import { 
  sendChatMessage, 
  getMessages, 
  getOrCreateThread, 
  getConversation,
  getAllThreads
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes require authentication (via cookies or bearer token)
router.use(authMiddleware);

/**
 * POST /api/chat/send
 * Send a message to another user
 * Auth: Cookie (token=jwt) or Header (Authorization: Bearer jwt)
 * Body: { "receiveId": "userId", "message": "text" }
 */
router.post("/send", sendChatMessage);

/**
 * GET /api/chat/messages/:threadId
 * Get all messages in a thread
 * Auth: Cookie (token=jwt) or Header (Authorization: Bearer jwt)
 */
router.get("/messages/:threadId", getMessages);

/**
 * GET /api/chat/thread/:userId1/:userId2
 * Get or create a thread between two users
 * Auth: Cookie (token=jwt) or Header (Authorization: Bearer jwt)
 */
router.get("/thread/:userId1/:userId2", getOrCreateThread);

/**
 * GET /api/chat/conversation/:receiveId
 * Get conversation with a specific user
 * Auth: Cookie (token=jwt) or Header (Authorization: Bearer jwt)
 */
router.get("/conversation/:receiveId", getConversation);

/**
 * GET /api/chat/threads
 * Get all threads for logged-in user
 * Auth: Cookie (token=jwt) or Header (Authorization: Bearer jwt)
 */
router.get("/threads", getAllThreads);

export default router;
