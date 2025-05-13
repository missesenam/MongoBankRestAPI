const express = require("express");
const {
  CreateAccount,
  ListAccounts,
  ListAccountById,
  UpdateAccount,
  DeleteAccount,
} = require("../controllers/Accountcontroller");

const MyAccountRouter = express.Router();

MyAccountRouter.post("/accounts", CreateAccount);
MyAccountRouter.get("/accounts", ListAccounts);
MyAccountRouter.get("/accounts/:id", ListAccountById);
MyAccountRouter.put("/accounts/:id", UpdateAccount);
MyAccountRouter.delete("/accounts/:id", DeleteAccount);

module.exports = MyAccountRouter;
