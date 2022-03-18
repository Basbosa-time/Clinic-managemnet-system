const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("../controllers/patientController")

const router = express.Router();

router
.get('',controller.getAllPatients)
.post('',[
    body("name").isString().withMessage("name shoudl be string").notEmpty(),
    body("history").isArray().withMessage("history should be string"),
    body("gender").isString().notEmpty().isIn(['male','female']).withMessage("gender should be a string whether male or female")
],controller.createPatient)

router
.get("/:patientId",[
    param("patientId").notEmpty().isAlphanumeric().withMessage("send patient id as alphanumeric to get his data")
],controller.getPatientById)
.put('/:patientId',[
    body("name").isString().withMessage("name shoudl be string").not().isEmpty().trim().escape()
],controller.updatePatient);



module.exports = router;