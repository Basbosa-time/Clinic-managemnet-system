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
    let appointment = {}
    appointmentModel.find({}).populate('invoice').then(appointments => {
      appointments.forEach(app => {
       // appDateMonth = new Date(app.date).getMonth();
        const appDateMonth = new Date(app.date).toLocaleString('default', { month: 'long' });
        appointment[appDateMonth] = appointment[appDateMonth] ? appointment[appDateMonth] + app.invoice.paidAmount : app.invoice.paidAmount
      })
      res.status(200).json({ appointment })

    })
  }

}
exports.getInvoices = () => { }
exports.getAppointments = () => { }