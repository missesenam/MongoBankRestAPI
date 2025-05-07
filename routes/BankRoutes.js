const express = require("express");
const {
  CreateBank,
  ListBanks,
  ListBankById,
  UpdateBank,
  DeleteBank,
} = require("../controllers/Bankcontroller");

const MyBankRouter = express.Router();

MyBankRouter.post("/bank", CreateBank);
MyBankRouter.get("/banks", ListBanks);
MyBankRouter.get("/banks/:id", ListBankById);
MyBankRouter.put("/bank/:id", UpdateBank);
MyBankRouter.delete("/bank/:id", DeleteBank);

module.exports = MyBankRouter;
