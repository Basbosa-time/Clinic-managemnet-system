const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("../controllers/doctorController");
const router = express.Router();

router.get("", controller.getAllDoctors);
router.get(
  "/service",
  [
    body("specId")
      .isAlphanumeric()
      .withMessage("Service Id should be alphanumeric"),
  ],
  controller.getDoctorsWithService
);
router.get(
  "/schedule",
  [
    body("docId")
      .isAlphanumeric()
      .withMessage("Doctor Id should be alphanumeric"),
  ],
  controller.getDoctorSchedule
);
router.post("", controller.createDoctor);

module.exports = router;
