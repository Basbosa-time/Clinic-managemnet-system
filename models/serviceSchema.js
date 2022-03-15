const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id:{
        type:mongoose.SchemaTypes.ObjectId,
        auto:true
    },
    name:{
        type:String,
        required:true
    },
    branches:[{type:mongoose.Schema.Types.ObjectId, ref:'branch'}],


})

module.exports = mongoose.model('service',schema);