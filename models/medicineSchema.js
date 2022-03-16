const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id:{
        type:mongoose.SchemaTypes.ObjectId,
        auto:true
    },
    name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        default:0
    },
    customers:{
        type:Number,
        default:0
    }
})




module.exports = mongoose.model('medicine',schema);