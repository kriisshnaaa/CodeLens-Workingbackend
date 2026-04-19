const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

if (!authHeader) {
  return res.status(401).json({
    success: false,
    message: "Authorization header missing"
  });
}

const token = authHeader.split(" ")[1];
if (!token) {
  return res.status(401).json({
    success: false,
    message: "Token missing"
  });
}

  try {
    const secretkey = process.env.JWT_SECRET || "defaultsecret";
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
