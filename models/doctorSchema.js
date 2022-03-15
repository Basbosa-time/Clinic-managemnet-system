const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    specialization:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'service'
    },
    schedule:[{branchId:{type:mongoose.SchemaTypes.ObjectId , required:true , ref:'branch'}, startTime:String , endTime:String , days:[{type:String}]}],


})

module.exports = mongoose.model('doctor',schema);