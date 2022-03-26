const { validationResult } = require("express-validator");
const appointmentModel = require("../models/appointmentSchema");
const invoiceModel = require("../models/invoiceSchema");
const doctorModel = require("../models/doctorSchema");
const serviceModel = require("../models/serviceSchema");

exports.getAppointment = (req, res, next) => {
  let errors = validationResult(req);
  let {
    params: { branchId },
  } = req;
  if (errors.length > 0) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    appointmentModel
      .find({ branch: branchId })
      .select({ bookingTime: 1, arrivalTime: 1, presc: 1 })
      .sort([["bookingTime"]])
      .populate([
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
          // select: "name",
        },
      ])
      .then((data) => {
        data.length !== 0
          ? res.status(200).json({ data })
          : res.status(202).json({ message: "this branch hasn't appointment" });
      })
      .catch((e) => {
        next(e);
      });
  }
};

exports.getDoctorAppointments = (req, res, next) => {
  let errors = validationResult(req);
  let {
    params: { branchId, doctorId },
  } = req;
  if (errors.length > 0) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    appointmentModel
      .find({
        $and: [
          { branch: branchId },
          { doctor: doctorId },
          { date: new Date(Date.now()).toLocaleDateString() },
        ],
      })
      .select({ date: 1, arrivalTime: 1, presc: 1 })
      .populate([
        {
          path: "patient",
          model: "patient",
        },
      ])
      .then((data) => {
        data.length !== 0
          ? res.status(200).json({ data })
          : res
              .status(202)
              .json({ message: "No appointments for this doctor today" });
      })
      .catch((e) => {
        next(e);
      });
  }
};

exports.getPatientPrescs = (req, res, next) => {
  let {
    params: { patientId },
  } = req;
  // console.log(patientId);
  let errors = validationResult(req);
  if (errors.length > 0) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    appointmentModel
      .find({
        $and: [
          { patient: patientId },
          { arrivalTime: { $exists: true, $ne: "" } },
        ],
      })
      .select({ presc: 1, date: 1 })
      .then((data) => {
        data.length !== 0
          ? res.status(200).json({ data })
          : res
              .status(202)
              .json({ message: "this patient doesn't have appointments" });
      })
      .catch((err) => next(err));
  }
};

exports.postAppointment = (req, res, next) => {
  let { body } = req;
  let errors = validationResult(req);
  if (errors.length > 0) {
    let error = new Error();
    error.status = 442;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    new invoiceModel({
      recep: body.recep,
      paymentMethod: body.paymentMethod,
      totalAmount: body.totalAmount,
      paidAmount: body.paidAmount,
    })
      .save()
      .then((invoice) => {
        new appointmentModel({
          branch: body.branch,
          patient: body.patient,
          doctor: body.doctor,
          bookingTime: body.bookingTime,
          date: body.date,
          invoice: invoice._id,
        })
          .save()
          .then((appointment) => {
            res.status(200).json({ appointment, invoice });
          })
          .catch((e) => {
            console.log("save apppintment", e);
            next(e);
          });
      })
      .catch((e) => {
        console.log("save invoice", e);
        next(e);
      });
  }
};

exports.putAppointment = (req, res, next) => {
  let errors = validationResult(req);
  let {
    params: { appointmentId },
  } = req;
  if (errors.length > 0) {
    let error = new Error();
    error.status = 442;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    appointmentModel
      .findByIdAndUpdate(
        appointmentId,
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      )
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.deleteAppointment = (req, res, next) => {
  let errors = validationResult(req);
  let {
    params: { appointmentId },
  } = req;
  if (errors.length > 0) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    appointmentModel
      .findByIdAndRemove(appointmentId)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => next(err));
  }
};
