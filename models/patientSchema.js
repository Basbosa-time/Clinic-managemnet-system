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
    history:[String],
    visits: [{
        branch:{
            type:mongoose.SchemaTypes.ObjectId,
            required:true
        },
        doctor:{
            type:mongoose.SchemaTypes.ObjectId,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        presc:{
            type:String,
            required:true
        }
    }]
})


module.exports = mongoose.model('patient',schema);