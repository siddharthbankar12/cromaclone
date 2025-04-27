import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
      middleName: "",
      lastName: lastName,
      email: email,
      password: hashPassword,
      phoneNo: phoneNo,
      dob: "",
    });

    await newUser.save();

    return res.json({ success: true, message: "Register Successfully .." });
  } catch (error) {
    console.log(error, "error from register API ..");
    return res.json({ success: false, message: error });
  }
};

export const login = async (req, res) => {
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
    // your get current user logic here
  } catch (error) {
    console.log(error, "error from getCurrentUser API ..");
    return res.json({ success: false, message: error });
  }
};
