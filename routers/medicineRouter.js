const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/medicineController");

const router = express.Router();

router
  .get("", controller.getAllMedicine)
  .post(
    "",
    [
      body("name")
        .notEmpty()
        .isString()
        .withMessage("name should be string and not empty"),
      body("company")
        .notEmpty()
        .isString()
        .withMessage("company should be string and not empty"),
      body("description")
        .notEmpty()
        .isString()
        .withMessage("description should be string and not empty"),
      body("quantity")
        .notEmpty()
        .isInt({ min: 0, max: 20 })
        .withMessage("quantity is required"),
      body("category")
        .notEmpty()
        .isString()
        .withMessage("category is required"),
    ],
    controller.createMedicine
  )
  .put(
    "/:medicineId",
    [
      param("medicineId")
        .isAlphanumeric()
        .withMessage("medicineId should be alphanumeric"),
    ],
    controller.updateMedicine
  )
  .delete(
    "/:medicineId",
    [
      param("medicineId")
        .isAlphanumeric()
        .withMessage("medicineId should be alphanumeric"),
    ],
    controller.deleteMedicine
  );

router.put(
  "/feedback/:medicineId",
  [
    param("medicineId")
      .isAlphanumeric()
      .withMessage("medicineId should be alphanumeric"),
    body("rate")
      .isFloat({ min: 0, max: 5 })
      .withMessage("rate should be an int between 0 and 5"),
  ],
  controller.addMedicineFeedback
);

module.exports = router;
