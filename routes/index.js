const router = require('express').Router();
const path = require('path')
const api_routes = require('./api');

router.use('*', (req, res, next) => {
  console.log("req made it to routes folder");
  next();
})

router.use('/api', api_routes)

router.get('/', (req, res) => {
  res.json({home: true})
})

// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, '../client/src/index.html'));
// });

module.exports = router;