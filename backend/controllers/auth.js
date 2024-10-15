const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = re.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const user = new User({ email, name, password: hashedPass });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        const error = new Error("Email id not found");
        error.statusCode = 401;
        throw error;
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        const error_1 = new Error("Authorization failed");
        error_1.statusCode = 401;
        throw error_1;
      }
      const token = jwt.sign({ email }, "somesupersecretkey");
      res.status(200).json({ token }); // Respond with the token
    })
    .catch((error) => {
      next(error); // Pass any errors to the next middleware
    });
};
