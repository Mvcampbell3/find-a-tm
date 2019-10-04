const router = require('express').Router();
const api_routes = require('./api');


router.use("/api", api_routes)

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
});

module.exports = router;