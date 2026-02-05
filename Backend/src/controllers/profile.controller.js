const users = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await users.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, age, bio, gender, location, socialLinks, skills } = req.body;
    const updates = {};

    // Fixed: req.file (dot instead of comma) and updates variable name
    if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    if (name) updates.name = name;
    if (age) updates.age = age;
    if (bio) updates.bio = bio;
    if (gender) updates.gender = gender;
    if (skills) updates.skills = skills;

    // Handle nested objects from FormData
    if (location) {
      if (location.city) updates["location.city"] = location.city;
      if (location.country) updates["location.country"] = location.country;
    }

    if (socialLinks) {
      if (socialLinks.linkedin) updates["socialLinks.linkedin"] = socialLinks.linkedin;
      if (socialLinks.github) updates["socialLinks.github"] = socialLinks.github;
    }

    const updatedUser = await users.findByIdAndUpdate(
      req.user.id,
      { $set: updates }, // Fixed: Use 'updates' object
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error); // Debugging ke liye
    res.status(500).json({ message: "Server error" });
  }
};