const {validationResult}= require("express-validator");
const appointmentModel = require("../models/appointmentSchema");
const invoiceModel=require('../models/invoiceSchema')

exports.getAppointment=async(req,res,next)=>{
  let errors = validationResult(req);
  console.log("getAppointment",req.body);
  if(errors!==[]){
    let apps =await appointmentModel.find({});
    res.json({apps});
  }
  else res.json(errors);
}