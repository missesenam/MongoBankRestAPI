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
    ref: "bank",
    required: true,
  },
});

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
