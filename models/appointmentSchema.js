const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    auto: true,
  },
  branch: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "branch",
  },
  doctor: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "doctor",
  },
  patient: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "patient",
  },
  bookingTime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  invoice: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "invoice",
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  presc: {
    type: String,
    required: true,
    default: "",
  },
});

module.exports = mongoose.model("appointment", schema);
