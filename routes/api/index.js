const router = require('express').Router();
const user_routes = require('./user-routes');
const game_routes = require('./game-routes');
const matrix_routes = require('./matrix_routes');
const suggestion_routes = require('./suggestion-routes');

const gameSeeds = require('../../seeds/gameSeed');
const userSeeds = require('../../seeds/userSeed');
const db = require('../../models')
const bcrypt = require('bcrypt')

router.use('*', (req, res, next) => {
  console.log('req made it api folder');
  next();
})

router.use('/user', user_routes);
router.use('/game', game_routes);
router.use('/matrix', matrix_routes);
router.use('/suggestion', suggestion_routes);

router.post('/seed', (req, res) => {
  if (req.body.password === process.env.SEED_KEY) {
    // seed db

    console.log('removing matrix and game dbs and seeding db games')
    // Remove Matrixes from Users
    db.Matrix.find()
      .then(matrixes => {
        matrixes.forEach(matrix => matrix.remove());
      })

    // Delete all games then seed
    db.Game.deleteMany()
      .then(
        gameSeeds.forEach((game, i) => {
          const newGame = new db.Game({
            title: game.title,
            img_url: game.img_url,
            developer: game.developer,
            team_game: game.team_game,
            reviewed: game.reviewed,
            userID: game.userID,
            ps4: game.ps4,
            xbox: game.xbox,
            nin_switch: game.nin_switch
          })
          newGame.save()
            .then(() => {
              console.log(`Loaded ${i + 1} of ${gameSeeds.length} games`)
            })
        })
      )

    // Delete all users then seed
    db.User.deleteMany()
      .then(() => {
        userSeeds.forEach((user, i) => {

          bcrypt.genSalt(10, function(err, salt) {
            if (err) {
              throw err;
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
              const newUser = new db.User({
                username: user.username,
                email: user.email,
                password: hash
              })
              newUser.save()
                .then(() => {
                  console.log(`Loaded ${i + 1} of ${userSeeds.length} users`)
                })
            })
          })
        })
      })

    res.json({ ok: true })
  } else {
    // reject request
    res.json({ ok: false })
  }
})

router.get('/', (req, res) => {
  res.json({ api: true })
})

module.exports = router;