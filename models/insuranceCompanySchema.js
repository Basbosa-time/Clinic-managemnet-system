const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  expenses: {
    type: Number,
    default: 0,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("insuranceCompany", schema);
