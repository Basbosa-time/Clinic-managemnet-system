const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    auto: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "doctor", "recep"],
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    refPath: "role",
  },
  image:String
});

module.exports = mongoose.model("user", schema);
