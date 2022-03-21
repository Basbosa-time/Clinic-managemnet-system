const doctor = require("../models/doctorSchema");
const recep = require("../models/recepSchema");
const jwt = require("jsonwebtoken");
exports.login = (req, res, next) => {
  Student.findOne({ name: req.body.name })
    .then((data) => {
      if (!data) next(new Error("username or password incorrect"));

      let token = jwt.sign(
        {
          email: req.body.email,
          id: data._id,
          role: req.body.role,
        },
        "basbosatime",
        { expiresIn: "1h" }
      );

      response.status(200).json({ data, token });
    })
    .catch((error) => {
      next(error);
    });
};
