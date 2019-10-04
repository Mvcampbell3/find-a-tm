const router = require('express').Router();
const db = require("../../models");
const bcrypt = require('bcrypt');
const passport = require('passport');

// router.use('*', (req, res, next) => {
//   console.log('made it to user folder');
//   next();
// })

router.get('/', (req, res) => {
  res.json({ user: true })
})

router.get('/all', (req, res) => {
  db.User.find()
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err))
})

router.delete('/testdeleteall', (req, res) => {
  db.User.remove()
    .then(end => res.status(200).json(end))
    .catch(err => res.status(500).json(err))
})

router.post('/signup', (req, res) => {
  console.log(req.body)
  db.User.findOne({ email: req.body.email })
    .then(dbUser => {
      if (!dbUser) {
        const { email, username, password } = req.body;

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            const newUser = new db.User({
              username,
              email,
              password: hash
            });
            console.log(newUser)
            newUser.save()
              .then(user => {
                console.log(user);
                res.status(201).json(user);
              })
              .catch(err => {
                console.log(err);
                res.json(err);
              })
          })
        })
      }
    })
})

module.exports = router;