const { validationResult } = require('express-validator')
const branch = require('../models/branchSchema');

exports.getAllBranches = (req,res,next)=>{
    console.log("err");
    branch.find({}).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        next(err);
    })
}


exports.createBranch = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let error=new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
        throw error;
    }
    let newBranch = new branch({
        name:req.body.name,
        location:req.body.location
    })

    newBranch.save().then(data=>{
        res.status(201).json({message:"branch added", data})
    }).catch(err=>next(err));

}