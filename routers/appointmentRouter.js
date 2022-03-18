const express = require("express");
const {body,param,query,oneOf}= require('express-validator');
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();

router.get("/:branchId",[param("branchId").isAlphanumeric().withMessage("Service Id should be alphanumeric")],appointmentController.getAppointment);

module.exports=router;