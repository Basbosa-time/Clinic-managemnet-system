const express = require("express");
const { body, param, query, oneOf } = require('express-validator');
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();
router.get("/:branchId",[
  param("branchId")
  .isAlphanumeric()
  .withMessage("Service Id should be alphanumeric")
  .exists()
  .withMessage("put appointment Id")
], appointmentController.getAppointment);

router.post("/", [
  body("doctor").exists().withMessage('please fill doctor Id').isAlphanumeric().withMessage("doc Id isn't correct"),
  body("patient").exists().withMessage("please fill patient Id").isAlphanumeric().withMessage("patient Id isn't correct"),
  body("bookingTime").exists().withMessage("please fill BookingTime").isString("bookingTime must be string"),
  body("branch").exists().withMessage("please fill branch id").isAlphanumeric().withMessage("branch must be string"),
  body("date").exists().withMessage("please fill date"),
  //body("invoice").exists().withMessage("please fill invoice data"),
  body("recep").exists().withMessage("please fill recep Id").isAlphanumeric().withMessage("recep Id isn't correct"),
  body("paymentMethod").exists().withMessage("please fill paymentMethod").isAlpha(),
  body("totalAmount").exists().withMessage("please fill totalAmount").isInt(),
  body("paidAmount").exists().withMessage("paymentAmount").isInt(),
], appointmentController.postAppointment)

router.put("/:appointmentId",[
  param('appointmentId').isAlphanumeric().withMessage("Service Id should be alphanumeric").exists().withMessage("put branch Id"),
  body('doctor').isAlphanumeric(),
  body('patient').isAlphanumeric(),
  body('bookingTime').isString(),
  body('arrivalTime').isString(),
  body('presc').isString()
],appointmentController.putAppointment)

router.delete("/:appointmentId",[
  param('appointmentId')
  .isAlphanumeric()
  .withMessage("Service Id should be alphanumeric")
  .exists()
  .withMessage("put appointment Id")
],appointmentController.deleteAppointment)

module.exports = router;