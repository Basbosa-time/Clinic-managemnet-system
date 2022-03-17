const { validationResult } = require('express-validator')
const patient = require('../models/patientSchema')
const branch = require('../models/branchSchema')
const doctor = require('../models/doctorSchema')
const { request } = require('express')

exports.getAllPatients = (req, res, next) => {
  patient
    .find()
    .populate({
      path: 'visits',
      populate: [
        { path: 'branch', model: 'branch' },
        { path: 'doctor', model: 'doctor' },
      ],
    })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

exports.createPatient = (req, res, next) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    let error=new Error();
    error.status=422;
    error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
    throw error;
  }
  let newPatient = new patient({
    name: req.body.name,
    gender: req.body.gender,
    history: req.body.history,
    visits: [],
    image: '',
  })

  newPatient
    .save()
    .then((data) => {
      res.status(201).json({ message: 'patient added', data })
    })
    .catch((err) => next(err))
}


