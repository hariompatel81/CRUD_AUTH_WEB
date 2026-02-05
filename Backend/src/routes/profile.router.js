const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/uploads.middleware");

const profileRouter = express.Router();

profileRouter.get("/profile/me", authMiddleware, getUserProfile);

// Sirf ek update route rakhein jo text aur image dono handle kare
profileRouter.patch("/profile/update", authMiddleware, upload.single('avatar'), updateUserProfile);

module.exports = profileRouter;