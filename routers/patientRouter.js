const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("../controllers/patientController")

const router = express.Router();

router
.get('',controller.getAllPatients)
.post('',[
    body("name").isString().withMessage("name shoudl be string"),
    body("history").isString().withMessage("history should be string"),
    body("gender").isString().withMessage("gender should be a string")
],controller.createPatient)

module.exports = router;