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
  [
    body("name").trim().not().isEmpty().withMessage("name is required"),
    body("location").trim().not().isEmpty().withMessage("location is required"),
    body("address").trim().not().isEmpty().withMessage("address is required"),
    body("phone")
      .matches(/^(0|\+234)\d{10}$/)
      .withMessage("Invalid Nigerian phone number")
      .bail()
      .matches(/^(0|\+233)\d{9}$/)
      .withMessage("Invalid Ghanaian phone number")
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
MyBankRouter.get("/banks", ListBanks);
MyBankRouter.get("/banks/:id", ListBankById);
MyBankRouter.put("/bank/:id", UpdateBank);
MyBankRouter.delete("/bank/:id", DeleteBank);

module.exports = MyBankRouter;
