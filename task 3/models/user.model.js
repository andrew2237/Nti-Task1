// grades [],  phone number, type
const mongoose = require("mongoose");
const validator = require("validator");
const user = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: Number,
    trim: true,
    min: 1000,
    max: 100000,
  },
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value, ["ar-EG"]))
        throw new Error("invalid phone number");
    },
  },
  transaction: [
    {
      transactiontype: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
      },
    },
  ],
});
module.exports = user;
