const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next()
  } catch (err) {
    console.log(err);
    req.userId = undefined;
    res.status(401).json("Unauthorized");
  }
}