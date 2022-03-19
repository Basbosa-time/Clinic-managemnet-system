const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/serviceController");

const router = express.Router();

router
  .get("", controller.getAllServices)
  .post(
    "",
    [
      body("name").isString().notEmpty().withMessage("name should be string"),
      body("branches").isArray().withMessage("branches is an array"),
      body("branches.*")
        .isAlphanumeric()
        .withMessage("branches is array of alphaumerics"),
    ],
    controller.createService
  );
router.get(
  "/branches/:serviceId",
  [
    param("serviceId")
      .isAlphanumeric()
      .withMessage("serviceId should be alphanumeric"),
  ],
  controller.getServiceBranches
);

router.get("/doctors/:serviceId", [
    param("serviceId")
      .isAlphanumeric()
      .withMessage("serviceId should be alphanumeric")
],controller.getServiceDoctors);
module.exports = router;
