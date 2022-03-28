require("dotenv").config();
const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  user
    .findOne({ email: req.body.email, password: req.body.password })
    .populate({ path: "owner", model: "doctor" })
    .then((data) => {
      console.log(data);
      if (!data) next(new Error("this user is not valid"));
      let accessToken = jwt.sign(
        {
          email: data.email,
          _id: data._id,
          password: data.password,
          role: data.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE_DATE }
      );
      res.status(200).json({ data: data, accessToken: accessToken });
    })
    .catch((err) => next(err));
};

exports.authenticateToken = (req, res, next) => {
  console.log(req);
  const authHeader = req.headers["authorization"];

  if (authHeader == "true") {
    next();
  }
  const token = authHeader && authHeader.split(" ")[1]; // if there is a token return it if not return null
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // not valid token
    req.user = user;
    next();
  });
};
