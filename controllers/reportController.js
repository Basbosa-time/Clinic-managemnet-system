const { validationResult } = require("express-validator");
const patientModel = require("../models/patientSchema")
const invoiceModel = require("../models/invoiceSchema")
const appointmentModel = require("../models/appointmentSchema");
exports.getGenderSummary = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    let male = 0;
    let female = 0;
    (await patientModel.find({})).forEach(patient => {
      (patient.gender === 'male') ? male++ : female++
    })
    res.status(200).json({ male, female })
  }

}
exports.getInvoicesSummary = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    let appointment = {'January':0,'February':0,'March':0,'April':0,'May':0,'June':0,'July':0,'August':0,'september':0,'October':0,'November':0,'December':0}
    appointmentModel.find({}).populate('invoice').then(appointments => {
      appointments.forEach(app => {
        // appDateMonth = new Date(app.date).getMonth();
        const appDateMonth = new Date(app.date).toLocaleString('default', { month: 'long' });
        appointment[appDateMonth] = appointment[appDateMonth] ? appointment[appDateMonth] + app.invoice.paidAmount : app.invoice.paidAmount
      })
      monthes=Object.keys(appointment)
      data = Object.values(appointment)
      res.status(200).json({data,monthes})
    })
  }

}
exports.getInvoices = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    invoiceModel.find({}).populate({path:"recep",model:"user",select:"name"}).then(invoices => {
      res.status(200).json(invoices)
    })

  }

}
exports.getAppointments = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    appointmentModel.find({}).populate([
      {
        path: "doctor",
        select: "name",
        populate: {
          path: "owner",
          model: "doctor",
          select: "specialization",
          populate: {
            path: "specialization",
            select: "name",
            model: "service",
          },
        },
      },
      {
        path: "patient",
        model: "patient",
        select: "name",
      },
      {
        path: 'branch',
        model: 'branch',
        select: "name"
      }
    ]).then(appointments => {
      res.status(200).json(appointments)
    })
  }
}