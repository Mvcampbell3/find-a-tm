const router = require('express').Router();
const db = require("../../models");

router.use('*', (req, res, next) => {
  console.log('made it to user folder');
  next();
})

router.get('/', (req, res) => {
  res.json({ user: true })
})

router.get('/all', (req, res) => {
  db.User.find()
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err))
})

router.post('/signup', (req, res) => {
  db.User.findOne({email: req.body.email})
    .then(dbUser => {
      if (!dbUser) {
        
      }
    })
})

module.exports = router;