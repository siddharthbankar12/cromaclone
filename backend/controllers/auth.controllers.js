import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const Register = async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      gender,
      phoneNo,
      email,
      password,
      confirmPassword,
    } = req.body.newUserData;

    if (
      !role ||
      !firstName ||
      !lastName ||
      !gender ||
      !phoneNo ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      gender,
      role,
      firstName,
      lastName,
      phoneNo,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registered successfully.",
    });
  } catch (error) {
    console.error("Register API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// LOGIN
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKENSECRETKEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      userData: {
        user: {
          ...user._doc,
          userId: user._id,
          password: undefined,
        },
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const decoded = jwt.verify(token, process.env.TOKENSECRETKEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      userData: {
        user: {
          ...user._doc,
          userId: user._id,
        },
      },
    });
  } catch (error) {
    console.error("getCurrentUser API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// UPDATE USER
export const updateCurrentUser = async (req, res) => {
  try {
    const { formData } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const decoded = jwt.verify(token, process.env.TOKENSECRETKEY);

    const updatedUser = await User.findByIdAndUpdate(decoded.userId, formData, {
      new: true,
    }).select("-password");

    const newToken = jwt.sign(
      { userId: updatedUser._id },
      process.env.TOKENSECRETKEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", newToken);

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      userData: {
        user: {
          ...updatedUser._doc,
          userId: updatedUser._id,
        },
      },
    });
  } catch (error) {
    console.error("updateCurrentUser API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// LOGOUT
export const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("logOutUser API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
