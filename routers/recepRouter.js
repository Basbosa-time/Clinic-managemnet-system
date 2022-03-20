const express = require("express");
const { body, query, param } = require("express-validator");
const controller = require("../controllers/recepController");
const router = express.Router();

router.get("", controller.getAllReceps);
router.post(
  "",
  [
    body("name")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Doctor name must be alphapitcal"),
    body("email").isEmail().withMessage("Doctor email is not valid"),
    body("branchId")
      .isAlphanumeric()
      .withMessage("Branch Id should be alphanumeric"),
  ],
  controller.createRecep
);

router.put(
  "/:recepUserId",
  [
    param("recepUserId")
      .isAlphanumeric()
      .withMessage("RecepUser Id should be alphanumeric"),
    body("name")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Doctor name must be alphapitcal"),
    body("email").isEmail().withMessage("Doctor email is not valid"),
    body("branchId")
      .isAlphanumeric()
      .withMessage("Branch Id should be alphanumeric"),
  ],
  controller.updateRecep
);

router.delete("/:recepUserId", controller.deleteRecep);

module.exports = router;
