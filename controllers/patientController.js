const { validationResult } = require("express-validator");
const patient = require("../models/patientSchema");

exports.getAllPatients = (req, res, next) => {
  patient
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPatientById = (req, res, next) => {
  patient
    .findById(req.params.patientId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.createPatient = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }
  let newPatient = new patient({
    name: req.body.name,
    gender: req.body.gender,
    history: req.body.history,
    image: "",
  });

  newPatient
    .save()
    .then((data) => {
      res.status(201).json({ message: "patient added", data });
    })
    .catch((err) => next(err));
};

exports.updatePatient = (req, res, next) => {
  const id = req.params.patientId;
  console.log(id);
  patient
    .findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          gender: req.body.gender,
          history: req.body.history,
        },
      },
      { new: true }
    )
    .then((data) => {
      if (data == null) console.log("err");
      res.status(201).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
