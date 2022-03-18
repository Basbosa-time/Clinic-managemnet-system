const { validationResult } = require("express-validator");
const appointmentModel = require("../models/appointmentSchema");
const invoiceModel = require('../models/invoiceSchema')
const doctorModel = require('../models/doctorSchema')
const serviceModel = require('../models/serviceSchema')
exports.getAppointment = async (req, res, next) => {
  let errors = validationResult(req);
  let { params: { branch } } = req;
  console.log("getAppointment", req.params, branch);
  if (errors.length > 0) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }
  else {
    appointmentModel
      .find({ branch })
      .select({ "bookingTime": 1 })
      .populate([
        {
          path: 'doctor',
          select: 'name',
          populate: {
            path: 'owner',
            model: 'doctor',
            select: 'specialization',
            populate: {
              path: 'specialization',
              select: 'name',
              model: 'service',
            }
          }
        },
        {
          path: 'patient',
          model: 'patient',
          select: 'name'
        }
      ]).then((data) => {
        apps.length !== 0 ? res.json({ data }) : res.json({ message: "this branch hasn't appointment" })
      }).catch(e => {
        console.log(e);
        next(e);
      })
  }
}

exports.postAppointment = async (req, res, next) => {
 //console.log(req.body);
 let{body}=req
 let errors = validationResult(req);
 if(errors.length>0){
   let error= new Error();
   error.status=442;
   error.message = errors.array().reduce((current,object)=> current+object.msg+" ","") 
    console.log("yyyyy",{errors});
   next(error);
  // res.json({error}) 
 }else{
   new invoiceModel({
     recep:body.recep,
     paymentMethod:body.paymentMethod,
     totalAmount:body.totalAmount,
     paidAmount:body.paidAmount
   }).save().then(invoice=>{
    new appointmentModel({
      branch:body.branch,
      patient:body.patient,
      doctor:body.doctor,
      bookingTime:body.bookingTime,
      date:body.date,
      invoice:invoice._id
    }).save().then(appointment=>{
      res.json({appointment,invoice})
    }).catch(e=>{
      console.log("save apppintment",e);
      next(e);
    })
   }).catch(e=>{
     console.log("save invoice", e);
     next(e);
   })
 }
}

