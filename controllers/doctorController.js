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
    .populate({ path: "owner", model:'doctor'})
    .then((data) => {
      let docsUsers = data.filter(
        (docUser) => docUser.owner.specialization == req.params.specId
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
    .findById(req.params.docUserId)
    .populate({ path: "owner", model:'doctor'})
    .then((data) => {
      res.status(200).json(data.owner.schedule);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.createDoctor = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  new doctor({
    specialization: req.body.specId,
    schedule: req.body.schedule
  })
    .save()
    .then((doc) => {
      new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "doctor",
        owner: doc._id,
      })
        .save()
        .then((data) => res.status(200).json({message:'added', data:data}))
        .catch((err) => {
          console.log(err);
          next(err);
        });
    });
};
