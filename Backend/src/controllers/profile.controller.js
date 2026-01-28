const users = require('../models/user.model');

exports.getUserProfile = async (req, res) => {
  try{
      const user = await users
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  }catch(error){
    res.status(500).json({ message: "Server error" });
  }
}
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = {};

    if (req.body.name) updates.name = req.body.name;
    if (req.body.age) updates.age = req.body.age;
    if (req.body.bio) updates.bio = req.body.bio;

    // Optional safety check
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update"
      });
    }

    const updatedUser = await users.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

