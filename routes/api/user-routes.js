const router = require('express').Router();

router.use('*', (req, res, next) => {
  console.log('made it to user folder');
  next();
})

router.get('/', (req, res) => {
  res.json({ user: true })
})

module.exports = router;