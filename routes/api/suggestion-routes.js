const router = require('express').Router();
const db = require('../../models');
const checkAuth = require("../../middleware/checkAuth")

router.get('/', (req, res) => {
  db.Suggestion.find()
    .then(suggestions => {
      res.status(200).json(suggestions)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

router.post('/newsuggestion', checkAuth, (req, res) => {
  const newSuggestion = new db.Suggestion({
    game_title: req.body.game_title,
    userID: req.userID,
  })

  newSuggestion.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

module.exports = router;