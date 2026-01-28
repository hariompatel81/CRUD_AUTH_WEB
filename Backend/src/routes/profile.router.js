const express = require("express");
const {
  getUserProfile,
  updateUserProfile
} = require("../controllers/profile.controller");

const authMiddleware = require("../middleware/auth.middleware");

const profileRouter = express.Router();

profileRouter.get("/profile/me", authMiddleware, getUserProfile);
profileRouter.patch("/profile/update", authMiddleware, updateUserProfile);

module.exports = profileRouter;
