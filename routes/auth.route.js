import express from "express";
import {
  initiateSignup,
  verifySignupOtp,
  login
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * SIGNUP FLOW
 */

// Step 1: Initiate signup (generate OTP). remember take base url as /auth in index.js, so the full url for this route will be /auth/signup/initiate
router.post("/signup/initiate", initiateSignup);
console.log("Signup initiation route set up at /auth/signup/initiate");

// Step 2: Verify OTP and create user
router.post("/signup/verify", verifySignupOtp);

// Step 3: Login
router.post("/login", login);

export default router;
