const { validationResult } = require("express-validator");
const user = require("../models/userSchema");
const doctor = require("../models/doctorSchema");

exports.getAllDoctors = (req, res, next) => {
  user
    .find({ role: "doctor" })
    .populate("owner")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getDoctorsWithService = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  user
    .find({ role: "doctor" })
    .populate("owner")
    .then((data) => {
      let docsUsers = data.filter(
        (docUser) => docUser.owner.specialization == req.body.specId
      );
      res.status(200).json(docsUsers);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.getDoctorSchedule = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  user
    .find({ role: "doctor" })
    .populate("owner")
    .then((data) => {
      let docUser = data.filter(
        (_docUser) => _docUser.owner._id == req.body.docId
      )[0];
      res.status(200).json(docUser.owner.schedule);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.createDoctor = (req, res, next) => {};
