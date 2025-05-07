const express = require("express");
const {
  CreateAccount,
  ListAccounts,
  ListAccountById,
  UpdateAccount,
  DeleteAccount,
} = require("../controllers/Accountcontroller");

const MyAccountRouter = express.Router();

MyAccountRouter.post("/account", CreateAccount);
MyAccountRouter.get("/accounts", ListAccounts);
MyAccountRouter.get("/accounts/:id", ListAccountById);
MyAccountRouter.put("/account/:id", UpdateAccount);
MyAccountRouter.delete("/account/:id", DeleteAccount);

module.exports = MyAccountRouter;
