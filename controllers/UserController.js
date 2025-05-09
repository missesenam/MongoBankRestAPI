const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(400)
        .json({ message: "failed to sign in", error: errors.array() });
    }
    const { username, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedpassword,
    });

    res.status(200).json({
      message: "user created successfully",
      User: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error, failed to signup", error: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(400)
        .json({ message: "failed to sign in", error: errors.array() });
    }
    const { username, password } = req.body;
    //  Find the User in the Database
    const findUser = await UserModel.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare Passwords
    const comaperePassword = await bcrypt.compare(password, findUser.password);
    if (!comaperePassword) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //  Generate a Token
    const token = jwt.sign(
      {
        userId: findUser._id,
        username: findUser.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "4h" }
    );
    // Send the Response
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (err) {
    console.error("Sign-in error:", err.message);
    res.status(500).json({ message: "Server error, failed to sign in" });
  }
};

module.exports = { signUp, signIn };
