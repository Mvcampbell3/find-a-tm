const router = require('express').Router();
const db = require("../../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require("../../middleware/checkAuth")

//test route
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
                res.status(422).json({ err });
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
        return res.status(401).json({ message: "Incorrect email and/or password", error: "error" })
      }
      // Get password match from User model
      const match = await dbUser.validatePassword(password);
      // inccorrect password
      if (!match) {
        return res.status(401).json({ message: "Incorrent email and/or password", error: "error" })
      }
      // generate token
      jwt.sign({ id: dbUser._id }, process.env.JWT_KEY, { expiresIn: '2h' }, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Server failed request", message: "Process failed at token assign", err });
        }
        // ship token to front end for storage
        res.status(200).json({ success: true, token })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server failed request", message: "Process failed at database find" })
    })
})

router.get('/auth', checkAuth, (req, res) => {
  res.status(200).json({ user: true, id: req.userID })
})

router.get('/profile', checkAuth, (req, res) => {
  console.log(req.userID)
  const promises = [db.User.findById(req.userID).select('-password'), db.Matrix.find({ userID: req.userID }).populate('gameID')];
  Promise.all(promises)
    .then(results => {
      const profile = {
        userInfo: results[0],
        matrixInfo: results[1]
      }
      res.status(200).json(profile)
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

router.get('/gamelist', checkAuth, (req, res) => {
  const promises = [db.User.findById(req.userID).select('-password'), db.Matrix.find({ userID: req.userID })];
  Promise.all(promises)
    .then(results => {
      const profile = {
        userInfo: results[0],
        matrixInfo: results[1]
      }
      res.status(200).json(profile)
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

router.put('/updateonline', checkAuth, (req, res) => {
  console.log(req.body.date);
  db.User.findById(req.userID).select("-password")
    .then(user => {
      user.lastOnline = req.body.date;
      user.save()
        .then(result => {
          console.log(result);
          res.status(200).json(result)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err)
        })
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err)
    })
})

router.put('/addplatform', checkAuth, (req, res) => {
  console.log(req.body.system, req.body.gamerTag);
  db.User.findByIdAndUpdate(req.userID, { $push: { platforms: { system: req.body.system, gamerTag: req.body.gamerTag } } })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

router.put('/deleteplatform', checkAuth, (req, res) => {
  const { system, gamerTag } = req.body;

  db.Matrix.find({ gamerTag })
    .then(matrices => {
      if (matrices.length > 0) {
        matrices.forEach(matrix => matrix.remove()
          .then(result => {
            console.log(result);
            console.log('this ran')
            db.User.findByIdAndUpdate(req.userID, { $pull: { platforms: { system, gamerTag } } })
              .then(end => {
                console.log(end);
                res.status(200).json(end);
              })
              .catch(err => {
                console.log(err)
                res.status(422).json(err);
              })
          })
          .catch(err => {
            res.status(422).json(err)
          })
        )
      } else {
        db.User.findByIdAndUpdate(req.userID, { $pull: { platforms: { system, gamerTag } } })
          .then(end => {
            console.log(end);
            res.status(200).json(end);
          })
          .catch(err => {
            console.log(err)
            res.status(422).json(err);
          })
      }
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/intro/:id', checkAuth, (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, { intro: false }, { new: true })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

module.exports = router;