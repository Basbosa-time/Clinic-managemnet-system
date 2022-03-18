const express = require("express");
const {body,param,query} = require("express-validator");
const controller = require("../controllers/branchController")

const router = express.Router();

router
.get('',controller.getAllBranches)
.post('',controller.createBranch);

module.exports = router;