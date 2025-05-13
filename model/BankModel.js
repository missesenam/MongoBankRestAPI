const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accounts: [
    {
      accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
      },
    },
  ],
});

const BankModel = mongoose.model("bank", BankSchema);

module.exports = BankModel;
