const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/serviceController");

const router = express.Router();

router.get("", controller.getAllServices).post("", controller.createService);
router.get("/branches/:serviceId", controller.getServiceBranches);
module.exports = router;
