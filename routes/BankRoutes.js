const express = require("express");
const { body } = require("express-validator");
const {
  CreateBank,
  ListBanks,
  ListBankById,
  UpdateBank,
  DeleteBank,
} = require("../controllers/Bankcontroller");
const BankModel = require("../model/BankModel");
const isAuth = require("../middleware/isAuth");
// const { Promise } = require("mongoose");

const MyBankRouter = express.Router();

const phoneAlreadyExists = (value, { req }) => {
  return BankModel.findOne({ phone: value }).then((bankDoc) => {
    if (bankDoc) {
      return Promise.reject("phone number already exist");
    }
  });
};

const accnumAlreadyExists = (value, { req }) => {
  return BankModel.findOne({ accountNumber: value }).then((bankDoc) => {
    if (bankDoc) {
      return Promise.reject("account Number number already exist");
    }
  });
};

MyBankRouter.post(
  "/bank",
  isAuth,
  [
    body("name").trim().not().isEmpty().withMessage("name is required"),
    body("location").trim().not().isEmpty().withMessage("location is required"),
    body("address").trim().not().isEmpty().withMessage("address is required"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("phone number is required")
      .bail()
      .custom((value) => {
        const isNigerian = /^(0|\+234)\d{10}$/.test(value);
        const isGhanaian = /^(0|\+233)\d{9}$/.test(value);
        if (!isNigerian && !isGhanaian) {
          throw new Error("Invalid Nigerian or Ghanaian phone number");
        }
        return true;
      })
      .bail()
      .custom(phoneAlreadyExists),
    body("accountNumber")
      .trim()
      .isNumeric()
      .custom(accnumAlreadyExists)
      .not()
      .isEmpty()
      .withMessage("account Number is required"),
  ],
  CreateBank
);
MyBankRouter.get("/banks", isAuth, ListBanks);
MyBankRouter.get("/banks/:id", isAuth, ListBankById);
MyBankRouter.put("/bank/:id", isAuth, UpdateBank);
MyBankRouter.delete("/bank/:id", isAuth, DeleteBank);

module.exports = MyBankRouter;
