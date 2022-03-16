const mongoose = require("mongoose");

const schema = mongoose.Schema({
  branch: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "branch",
    required: true,
  },
});

module.exports = mongoose.model("recep", schema);
