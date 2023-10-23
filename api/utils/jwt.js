const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.JWT_SECRET ?? "";
const signToken = (payload, options) => jwt.sign(payload, secretKey, options);

const verifyToken = (token, options) => jwt.verify(token, secretKey, options);

module.exports = {
  signToken,
  verifyToken,
};
