const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  bankId: {
    type: Schema.Types.ObjectId,
    ref: "Thebank",
    required: true,
  },
});

const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = AccountModel;
