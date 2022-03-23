const express = require("express");
const { body, param } = require("express-validator");
const insuranceCompanyController = require("../controllers/insuranceCompanyController");
const router = express.Router();
router.get("/", insuranceCompanyController.getInsuranceCompany);
router.post("/", insuranceCompanyController.postInsuranceCompany);
router.delete(
  "/:insuranceCompanyId",
  insuranceCompanyController.deleteInsuranceCompany
);
router.put("/:insuranceCompanyId", insuranceCompanyController.addExpenses);
module.exports = router;
