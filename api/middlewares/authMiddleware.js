const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers["Authorization"];
    if (!accessToken) {
      return res
        .status(401)
        .json({ status: 401, message: "You are not authenticated" });
    }
    const decoded = verifyToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "Invalid access token" });
  }
};

module.exports = authMiddleware;
