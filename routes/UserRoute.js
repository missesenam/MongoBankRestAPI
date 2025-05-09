const { signUp, signIn } = require("../controllers/UserController");
const express = require("express");
const { body } = require("express-validator");
const UserModel = require("../model/UserModel");

const userRouter = express.Router();

// const usernameIsUniq = async (value, { req }) => {
//     const toBeUniq = ['username','email']
//   const usernameIsmatch = await UserModel.findOne({ username: value });
//   if (usernameIsmatch) {
//     return Promise.reject("username already exists");
//   }
// };

const checkUniqueness = async (value, { req, path }) => {
  try {
    const isMatch = await UserModel.findOne({ [path]: value });
    if (isMatch) {
      return Promise.reject(`${path} already exists`);
    }
  } catch (err) {
    return Promise.reject("Error checking uniqueness");
  }
};

userRouter.post(
  "/signup",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("username field is required")
      .custom(checkUniqueness),
    body("email")
      .not()
      .isEmpty()
      .withMessage("email field is required")
      .custom(checkUniqueness),
    body("password")
      .not()
      .isEmpty()
      .withMessage("password field is required")
      .isLength({ min: 5 }),
  ],
  signUp
);
userRouter.post(
  "/signin",
  [
    body("username").not().isEmpty().withMessage("username field is required"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("password field is required")
      .isLength({ min: 5 }),
  ],
  signIn
);

module.exports = userRouter;
