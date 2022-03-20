const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("../controllers/doctorController");
const router = express.Router();

router.get("", controller.getAllDoctors);
router.get(
  "/:specId",
  [
    param("specId")
      .isAlphanumeric()
      .withMessage("Service Id should be alphanumeric"),
  ],
  controller.getDoctorsWithService
);
router.get(
  "/schedule/:docUserId",
  [
    param("docUserId")
      .isAlphanumeric()
      .withMessage("DoctorUser Id should be alphanumeric"),
  ],
  controller.getDoctorSchedule
);
router.post(
  "",
  [
    body("name")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Doctor name must be alphapitcal"),
    body("email").isEmail().withMessage("Doctor email is not valid"),
    body("schedule").isArray().withMessage("Doctor schedule must be array"),
    body("schedule.*.branch").notEmpty().withMessage("Branch is required"),
    body("schedule.*.startTime")
      .matches("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
      .withMessage("start time must match HH:MM"),
    body("schedule.*.endTime")
      .matches("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
      .withMessage("end time must match HH:MM"),
    body("").custom((val, { req }) => {
      req.body.schedule.forEach((el) => {
        let startH = el.startTime.split(":")[0];
        let endH = el.endTime.split(":")[0];
        if (parseInt(startH) >= parseInt(endH)) {
          throw new Error("end time must be greater than start time");
        }
      });
      return true;
    }),
    body("schedule.*.days")
      .isArray({ min: 1 })
      .withMessage("schedule days must be array"),
    body("schedule.*.days.*")
      .isLength({ min: 3 })
      .withMessage("invalid schedule days"),
  ],
  controller.createDoctor
);

router.put(
  "",
  [
    body("docUserId")
      .isAlphanumeric()
      .withMessage("DoctorUser Id should be alphanumeric"),
    body("name")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Doctor name must be alphapitcal"),
    body("email").isEmail().withMessage("Doctor email is not valid"),
    body("schedule").isArray().withMessage("Doctor schedule must be array"),
    body("schedule.*.branch").notEmpty().withMessage("Branch is required"),
    body("schedule.*.startTime")
      .matches("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
      .withMessage("start time must match HH:MM"),
    body("schedule.*.endTime")
      .matches("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
      .withMessage("end time must match HH:MM"),
    body("").custom((val, { req }) => {
      req.body.schedule.forEach((el) => {
        let startH = el.startTime.split(":")[0];
        let endH = el.endTime.split(":")[0];
        if (parseInt(startH) >= parseInt(endH)) {
          throw new Error("end time must be greater than start time");
        }
      });
      return true;
    }),
    body("schedule.*.days")
      .isArray({ min: 1 })
      .withMessage("schedule days must be array"),
    body("schedule.*.days.*")
      .isLength({ min: 3 })
      .withMessage("invalid schedule days"),
  ],
  controller.updateDoctor
);

router.delete("/:docUserId", controller.deleteDoctor);

module.exports = router;
