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
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  history: [String],
  visits: [
    {
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
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      presc: {
        type: String,
        required: true,
      },
    },
  ],
  image:String,
});

module.exports = mongoose.model("patient", schema);
