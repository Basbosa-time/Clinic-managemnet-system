const service = require("../models/serviceSchema");
const { validationResult } = require("express-validator");
const doctor = require("../models/doctorSchema");

exports.getAllServices = (req, res, next) => {
  service
    .find({})
    .populate("branches")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => next(err));
};

exports.createService = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }

  let newService = new service({
    name: req.body.name,
    branches: req.body.branches,
  });

  newService
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => next(err));
};

exports.getServicesWithBranchId = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }

  service
    .find({
      branches: req.params.branchId,
    })
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => next(err));
};
