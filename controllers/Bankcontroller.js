const { validationResult } = require("express-validator");
const BankModel = require("../model/BankModel");
const AccountModel = require("../model/AccountModel");

const CreateBank = async (req, res) => {
  try {
    // validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => ({ msg: err.msg }));
      console.log(errors);
      return res
        .status(400)
        .json({ message: "validation failed", errors: errors.array() });
    }
    const { name, location, address, phone, accountNumber } = req.body;

    // not needed anymore cause have validator
    // if (!name || !location || !address || !phone || !accountNumber) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    const NewCreatedBank = await BankModel.create({
      name,
      location,
      address,
      phone,
      accountNumber,
    });
    res.status(201).json({
      message: "Bank has been successfully created",
      bank: NewCreatedBank,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Creating Bank", error: error.message });
  }
};

const ListBanks = async (req, res) => {
  try {
    const FindAllBanks = await BankModel.find();
    if (FindAllBanks.length === 0) {
      res.status(404).json({ message: "No banks found" });
    }
    res
      .status(200)
      .json({ message: "Banks retrieved successfully", banks: FindAllBanks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error: error.message });
  }
};

const ListBankById = async (req, res) => {
  try {
    const id = req.params.id;
    const bankById = await BankModel.findById(id);
    if (!bankById) {
      return res
        .status(404)
        .json({ message: `Bank not Found with this ID: ${id}` });
    }
    res.status(200).json({ message: "Bank Found", bank: bankById });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting bank", error: error.message });
  }
};

const UpdateBank = async (req, res) => {
  try {
    const { name, location, address, phone, accountNumber } = req.body;
    const id = req.params.id;

    if (!name || !location || !address || !phone || !accountNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedBank = await BankModel.findByIdAndUpdate(
      id,
      {
        name,
        location,
        address,
        phone,
        accountNumber,
      },
      { new: true }
    );
    if (!updatedBank) {
      return res.status(404).json({ message: "Bank not found" });
    }
    res
      .status(200)
      .json({ message: "Bank updated successfully", bank: updatedBank });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating bank", error: error.message });
  }
};

const DeleteBank = async (req, res) => {
  try {
    const id = req.params.id;
    const bankDeleted = await BankModel.findByIdAndDelete(id);

    if (!bankDeleted) {
      return res.status(404).json({ message: "Bank not found" });
    }
    await AccountModel.deleteMany({ bankId: bankDeleted._id });
    res.status(200).json({
      message: "Bank  and related accounts deleted successfully",
      bank: bankDeleted,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting bank", error: error.message });
  }
};

module.exports = {
  CreateBank,
  ListBanks,
  ListBankById,
  UpdateBank,
  DeleteBank,
};
