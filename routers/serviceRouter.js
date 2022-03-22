const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/serviceController");

const router = express.Router();

router
  .get("", controller.getAllServices)
  .get(
    "/branches/:branchId",
    [
      param("branchId")
        .isAlphanumeric()
        .withMessage("branch id in params should be alphanumeric"),
    ],
    controller.getServicesWithBranchId
  )
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
module.exports = router;
