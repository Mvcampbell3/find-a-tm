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
  db.Game.find()
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err))
})

router.delete('/testdeleteall', (req, res) => {
  db.Game.remove()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
})

router.post('/newgame', checkAuth, (req, res) => {
  const { title, developer, ps4, team_game } = req.body;

  const newGame = new db.Game({
    title,
    developer,
    ps4,
    team_game,
    userId: req.userId
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


module.exports = router;