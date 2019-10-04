const router = require('express').Router();
const db = require("../../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use('*', (req, res, next) => {
  console.log('req made it to user folder');
  next();
})
// test route
router.get('/', (req, res) => {
  res.json({ user: true })
})
// test route
router.get('/all', (req, res) => {
  db.User.find()
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json(err))
})
// test delete route
router.delete('/testdeleteall', (req, res) => {
  db.User.remove()
    .then(end => res.status(200).json(end))
    .catch(err => res.status(500).json(err))
})

// user signup route
router.post('/signup', (req, res) => {
  // Find user with email in db
  db.User.findOne({ email: req.body.email })
    .then(dbUser => {
      // not a user yet, can continue
      if (!dbUser) {
        const { email, username, password } = req.body;
        // bcrypt password
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            // create new user object
            const newUser = new db.User({
              username,
              email,
              password: hash
            });
            // save user to db
            newUser.save()
              .then(user => {
                console.log(user);
                res.status(201).json(user);
              })
              .catch(err => {
                console.log(err);
                res.status(422).json(err);
              })
          })
        })
      } else {
        // dbUser !== null
        res.status(422).json({ message: "User with email already signed up" })
      }
    })
})

// user login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Find user with req email in db
  db.User.findOne({ email })
    // async for bcrypt.validate in User model
    .then(async dbUser => {
      // User email does not exist
      // Keeping err status and message same
      if (!dbUser) {
        return res.status(401).json({ message: "Incorrect email and/or password" })
      } 
      // Get password match from User model
      const match = await dbUser.validatePassword(password);
      // inccorrect password
      if (!match) {
        return res.status(401).json({ message: "Incorrent email and/or password" })
      }
      // generate token
      jwt.sign({ id: dbUser._id }, process.env.JWT_KEY, { expiresIn: '10m' }, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Server failed request", message: "Process failed at token assign" });
        }
        // ship token to front end for storage
        res.status(200).json({ success: true, token })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Server failed request", message: "Process failed at database find"})
    })
})

module.exports = router;