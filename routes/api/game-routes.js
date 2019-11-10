const router = require('express').Router();
const db = require('../../models');
const checkAuth = require('../../middleware/checkAuth')

router.use('*', (req, res, next) => {
  console.log('req made it to games folder');
  next();
})

router.get('/', (req, res) => {
  res.status(200).json({ games: true })
})

router.get('/all', checkAuth, (req, res) => {
  db.Game.find().sort({title: 1})
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err))
})

// I do not want to delete the games

// router.delete('/testdeleteall', (req, res) => {
//   db.Game.remove()
//     .then(result => res.status(200).json(result))
//     .catch(err => res.status(500).json(err))
// })

router.post('/newgame', checkAuth, (req, res) => {
  const { title, developer, ps4, team_game } = req.body;

  const newGame = new db.Game({
    title,
    developer,
    ps4,
    team_game,
    userID: req.userID
  })

  newGame.save()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(422).json(err);
    })

})

router.get('/listplayers/:id', checkAuth, (req, res) => {
  console.log(req.params.id)
  db.Matrix.find({ gameID: req.params.id }).populate("gameID").populate("userID", "lastOnline")
    .then(matricies => {
      console.log(matricies)
      res.status(200).json(matricies)
    })
    .catch(err => res.status(400).json(err))
})

router.get('/info/:id', checkAuth, (req, res) => {
  db.Game.findById(req.params.id)
    .then(game => res.status(200).json(game))
    .catch(err => res.status(404).json({err}))
})


module.exports = router;