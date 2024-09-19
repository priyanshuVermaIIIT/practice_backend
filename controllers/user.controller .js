const getUserProfile = async (req, res) => {
    try {
      // The user is already attached to req.user by the protect middleware
      res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = { getUserProfile };