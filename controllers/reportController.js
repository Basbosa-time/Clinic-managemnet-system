const { validationResult } = require("express-validator");
const patientModel = require("../models/patientSchema")
exports.getGenderSummary = async (req,res,next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }
  let male = 0;
  let female = 0;
  (await patientModel.find({})).forEach(patient => {
    (patient.gender === 'male') ? male++ : female++
  })
  res.status(200).json({male,female})
}
exports.getInvoicesSummary = () => {

}
exports.getInvoices = () => { }
exports.getAppointments = () => { }