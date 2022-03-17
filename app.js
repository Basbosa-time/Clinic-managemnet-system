require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const patientRouter = require("./routers/patientRouter");


//image variables
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substring(0, 5) +
        "-" +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  )
    cb(null, true);
  else cb(null, false);
};

// create server
const app = express();
mongoose
  .connect("mongodb://localhost:27017/cms")
  .then(() => {
    console.log("DB connected ....");

    // listen on port Number
    app.listen(process.env.port, () => {
      console.log("I am Listenining on port 8000 .......");
    });
  })
  .catch((error) => {
    console.log(" DB Problem");
  });

/// Middlewares

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,OPTIONS"
  );
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage, fileFilter }).single("img"));

app.use(morgan("dev"));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// routes

app.use('/patients',patientRouter);







//error middleware
app.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});
