const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Utility function to generate tokens
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res.status(400).json({
        message: "Username is required",
        status: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        status: false,
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: false,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set cookies for tokens (HTTP-Only for security)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Login successful",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Internal Server Error",
      status: false,
    });
  }
};

const currentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: false,
      });
    }

    res.status(200).json({ data: user, message: "User found", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Internal Server Error",
      status: false,
    });
  }
};
const logout = async (req, res) => {
  // Clear cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully", status: true });
};
module.exports = { login, logout, currentUser };
