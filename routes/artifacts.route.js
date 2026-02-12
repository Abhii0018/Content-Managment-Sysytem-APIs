import express from "express";
import { createArtifact ,getArtifacts} from "../controllers/artifact.controller.js";
import { authMiddleware} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { apiLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

/**
 * Protected Artifact APIs
 */
router.post("/", authMiddleware,upload.single("file"), createArtifact);
router.get("/", apiLimiter, authMiddleware, getArtifacts);

export default router;

//mening of urlencoded explained:

