const { validationResult } = require("express-validator");
const insuranceCompanyModel = require("../models/insuranceCompanySchema");

exports.getInsuranceCompany = (req, res, next) => {
  let errors = validationResult(req);
  if (errors.length > 0) {
    let error = new Error();
    error.status = 442;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    insuranceCompanyModel.find({}).then((data) => {
      data.length > 0 ? res.status(200).json(data) : res.status(202).json(data);
    });
  }
};

exports.postInsuranceCompany = (req, res, next) => {
  let errors = validationResult(req);
  if (errors.length > 0) {
    let error = new Error();
    error.status = 442;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    new insuranceCompanyModel({
      ...req.body,
    })
      .save()
      .then((company) => {
        res.json(company);
      })
      .catch((e) => next(e));
  }
};

exports.deleteInsuranceCompany = (req, res, next) => {
  let errors = validationResult(req);
  let { insuranceCompanyId } = req.params;
  if (errors.length > 0) {
    let error = new Error();
    error.status = 442;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    insuranceCompanyModel
      .findByIdAndRemove(insuranceCompanyId)
      .then((company) => res.status(200).json(company))
      .catch((e) => next(e));
  }
};

exports.addExpenses = (req, res, next) => {
  let errors = validationResult(req);
  let { insuranceCompanyId } = req.params;
  if (errors.length > 0) {
    let error = new Error();
    error.status = 442;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    insuranceCompanyModel
      .findByIdAndUpdate(
        insuranceCompanyId,
        {
          $inc: { expenses: req.body.amount },
        },
        { new: true }
      )
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  }
};
