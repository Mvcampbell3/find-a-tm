const router = require('express').Router();
const user_routes = require('./user-routes');

router.use('*', (req, res, next) => {
  console.log('req made it api folder');
  next();
})

router.use('/user', user_routes);

router.get('/', (req, res) => {
  res.json({ api: true })
})

module.exports = router;