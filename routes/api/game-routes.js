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
  db.Game.find().sort({ title: 1 })
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err))
})

// I do not want to delete the games

// router.delete('/testdeleteall', (req, res) => {
//   db.Game.remove()
//     .then(result => res.status(200).json(result))
//     .catch(err => res.status(500).json(err))
// })

/*
title: game.title,
img_url: game.img_url,
developer: game.developer,
team_game: game.team_game,
reviewed: game.reviewed,
userID: game.userID,
ps4: game.ps4,
xbox: game.xbox,
nin_switch: game.nin_switch,
*/

router.post('/newgame', checkAuth, (req, res) => {
  const { game_title, developer, ps4, xbox, nin_switch, team_game, reviewed, userID, img_url } = req.body.game;

  const newGame = new db.Game({
    title: game_title,
    developer,
    ps4,
    xbox,
    nin_switch,
    team_game,
    reviewed,
    userID,
    img_url
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
    .catch(err => res.status(404).json({ err }))
})

router.delete('/delete/:id', checkAuth, (req, res) => {
  // add check for my id;
  if (req.userID === process.env.ADMIN_ID) {
    db.Game.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(404).json(err)
      })
  } else {
    res.status(401).json({ admin: false });
  }

})


module.exports = router;