const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.json({ status: 0, msg: "Access denied", data: {} });
  try {
    const decoded = jwt.verify(token, process.env.tokenSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.json({ status: 0, msg: "Invalid token", data: {} });
  }
};