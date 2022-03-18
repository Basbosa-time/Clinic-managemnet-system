const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("../controllers/patientController")

const router = express.Router();

router
.get('',controller.getAllPatients)
.post('',[
    body("name").isString().notEmpty().withMessage("name should be string"),
    body("history").isArray().withMessage("history should be string"),
    body("gender").isString().notEmpty().isIn(['male','female']).withMessage("gender should be a string whether male or female")
],controller.createPatient)

router
.get("/:patientId",[
    query("patientId").isAlphanumeric().withMessage("patientId should be alphanumeric"),
    param("patientId").notEmpty().isAlphanumeric().withMessage("send patient id as alphanumeric to get his data")
],controller.getPatientById)
.put('/:patientId',[
    query("patientId").isAlphanumeric().withMessage("patientId should be alphanumeric"),
    body("name").isString().withMessage("name shoudl be string").not().isEmpty().trim().escape()
],controller.updatePatient);



module.exports = router;