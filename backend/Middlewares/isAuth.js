const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  if (!token) {
    const error = new Error("Not Authorized");
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    const error = new Error("Not Authorized");
    error.statusCode = 500;
    next(error);
  }
};
