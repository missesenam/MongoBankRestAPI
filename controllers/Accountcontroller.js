const AccountModel = require("../model/AccountModel");

const CreateAccount = async (req, res) => {
  try {
    const { name, number, accountType, bankId } = req.body;

    if (!name || !number || !accountType || !bankId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const NewCreatedAccount = await AccountModel.create({
      name,
      number,
      accountType,
      bankId,
    });
    res.status(201).json({
      message: "Account has been successfully created",
      account: NewCreatedAccount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating account", error: error.message });
  }
};

const ListAccounts = async (req, res) => {
  try {
    const FindAllAccounts = await AccountModel.find().populate(
      "bankId",
      "name location"
    );
    if (FindAllAccounts.length === 0) {
      return res.status(404).json({ message: "No Accounts found" });
    }
    res.status(200).json({
      message: "Accounts retrieved successfully",
      Accounts: FindAllAccounts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving all accounts", error: error.message });
  }
};

const ListAccountById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error: error.message });
  }
};

const UpdateAccount = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error: error.message });
  }
};

const DeleteAccount = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error: error.message });
  }
};

module.exports = {
  CreateAccount,
  ListAccounts,
  ListAccountById,
  UpdateAccount,
  DeleteAccount,
};
