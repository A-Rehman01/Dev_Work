const JWT = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //GET token from header
  const token = req.header("x-auth-token");

  //check token if not exist
  if (!token) {
    //   401 not authorized error
    return res.status(401).json({ msg: "No token ,authorization failed" });
  }

  //Varify Token
  try {
    const decoded = JWT.verify(token, config.get("jwttoken"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
