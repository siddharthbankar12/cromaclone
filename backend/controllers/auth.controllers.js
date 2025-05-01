import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      return res.send({
        success: false,
        message: "please check if anything is missing ..",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password is not matched ..",
      });
    }

    const isEmailExist = await User.find({ email: email });

    if (isEmailExist?.length > 0) {
      return res.json({
        success: false,
        message: "Email already taken, please use another one ..",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = User({
      gender: gender,
      role: role,
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    return res.json({ success: true, message: "Register Successfully .." });
  } catch (error) {
    console.log(error, "error from register API ..");
    return res.json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required ..",
      });
    }

    const isUserExists = await User.findOne({ email: email });

    if (!isUserExists) {
      return res.json({ success: false, message: "Email is wrong .." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Password is wrong .." });
    }

    const JwtToken = jwt.sign(
      { userId: isUserExists._id },
      process.env.TOKENSECRETKEY
    );

    return res.json({
      success: true,
      message: "Login Successfully ..",
      userData: {
        user: {
          userId: isUserExists._id,
          name: `${isUserExists.firstName} ${isUserExists.lastName}`,
          phoneNo: isUserExists.phoneNo,
          role: isUserExists.role,
          phoneNo: isUserExists.phoneNo,
        },
        token: JwtToken,
      },
    });
  } catch (error) {
    console.log(error, "error from login API ..");
    return res.json({ success: false, message: error });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.json({ success: false });
    }

    const tokenData = jwt.verify(token, process.env.TOKENSECRETKEY);

    if (!tokenData) {
      return res.json({ success: false });
    }

    const isUserExists = await User.findById(tokenData.userId);
    if (!isUserExists) {
      return res.json({ success: false });
    }

    return res.json({
      success: true,
      userData: {
        user: {
          ...isUserExists._doc,
          userId: isUserExists._id,
        },
      },
    });
  } catch (error) {
    console.log(error, "error from getCurrentUser API ..");
    return res.json({ success: false, message: error });
  }
};

export const updateCurrentUser = async (req, res) => {
  try {
    const { formData, token } = req.body;

    if (!token)
      return res.json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.TOKENSECRETKEY);
    const userId = decoded.userId;

    const updatedUser = await User.findByIdAndUpdate(userId, formData, {
      new: true,
    });

    return res.json({
      success: true,
      message: "User updated successfully",
      userData: { user: updatedUser },
    });
  } catch (error) {
    console.log("error from updateCurrentUser API ..", error);
    return res.json({ success: false, message: error.message });
  }
};
