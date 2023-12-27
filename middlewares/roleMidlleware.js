const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = (role) => (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User not authorized" });
    }

    const { roles } = jwt.verify(token, secret);

    if (!roles.some((item) => item === role)) {
      return res.status(403).json({ message: "Not permitted" });
    }

    next();
  } catch (e) {
    console.log(e);

    return res.status(403).json({ message: "User not authorized" });
  }
};
