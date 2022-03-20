const { validationResult } = require("express-validator");
const user = require("../models/userSchema");
const recep = require("../models/recepSchema");

exports.getAllReceps = (req, res, next) => {
  user
    .find({ role: "recep" })
    .populate({ path: "owner", model: "recep" })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.createRecep = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  new recep({
    branch: req.body.branch,
  })
    .save()
    .then((recep) => {
      new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "recep",
        owner: recep._id,
      })
        .save()
        .then((data) => res.status(200).json({ message: "added", data: data }))
        .catch((err) => {
          console.log(err);
          next(err);
        });
    });
};

exports.updateRecep = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  user
    .findByIdAndUpdate(
      req.params.recepUserId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    )
    .then((data) => {
      if (data == null) throw new Error("RecepUser is not found!");
      recep
        .findByIdAndUpdate(
          data.owner,
          {
            $set: {
              branch: req.body.branch,
            },
          },
          { new: true }
        )
        .then((recep) => {
          res
            .status(200)
            .json({ message: "updated", data: { user: data, recep: recep } });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.deleteRecep = (req, res, next) => {
  user
    .findByIdAndDelete(req.params.recepUserId)
    .then((data) => {
      recep
        .findByIdAndDelete(data.owner)
        .then((recep) => res.status(200).json({ message: "deleted" }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
