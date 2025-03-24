import User from "../model/signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import express from "express"

dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: error.message || "Email Already Exist, Please LogIn",
      });
    }

    console.log(existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashedPassword", hashedPassword);

    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log(newUser);

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User sucessfully registered!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(401).json({
        success: false,
        message: "Email and password field is required",
      });
    }

    const user = await User.findOne({ email });

    console.log(user);
    console.log("UserId is getting print now");
    console.log("userID: ", user._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered, Please signUp",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("CheckPassword: ", checkPassword);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      secret_key,
      { expiresIn: "1h" }
    );

    console.log(token);

    const cookie = res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    console.log(cookie);
    return res.status(200).json({
      success: true,
      message: "Successfully Login",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error occured",
      error: error.message,
    });
  }
};

export const LogoutUser = (req, res) => {
  // const authToken = req.hea
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout failed:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while logging out" });
  }
};
