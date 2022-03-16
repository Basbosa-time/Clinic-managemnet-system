const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    auto: true,
  },
  patient: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "patient",
  },
  recep: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "recep",
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash", "credit"],
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  paidAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("invoice", schema);
