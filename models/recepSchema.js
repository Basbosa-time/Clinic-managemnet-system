const mongoose = require("mongoose");

const schema  = mongoose.Schema({
    branchId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'branch',
        required:true
    }
})

module.exports = mongoose.model('recep',schema);