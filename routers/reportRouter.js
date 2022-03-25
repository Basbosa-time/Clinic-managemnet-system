const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/reportController");

const router = express.Router();

router
  .get(
    "/invoicesSummary",controller.getInvoicesSummary)
router.get("/invices",controller.getInvoices);
router.get("/appointments",controller.getAppointments);
router.get("/genderSummary",controller.getGenderSummary)
 
module.exports = router;
