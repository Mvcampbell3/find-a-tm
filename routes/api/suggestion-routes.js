const router = require('express').Router();
const db = require('../../models');
const checkAuth = require("../../middleware/checkAuth")

const testID = '5dc04e5527d1e843f8a1a3de';

router.use('*', (req, res, next) => {
  console.log('req made it to suggestion folder');
  next();
})

router.get('/checkAuth', checkAuth, (req, res) => {
  if (req.userID === testID) {
    res.status(200).json({admin: true})
  } else {
    req.status(401).json({admin: false})
  }
})

router.get('/', checkAuth, (req, res) => {
  console.log(req.userID)
  if (req.userID === testID) {
    db.Suggestion.find()
      .then(suggestions => {
        res.status(200).json(suggestions)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  } else {
    res.status(401).json({ admin: false })
  }

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

router.delete('/testdeleteall', (req, res) => {
  db.Suggestion.remove()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
})

router.delete('/delete/:id', checkAuth, (req, res) => {
  if (req.userID === testID) {
    db.Suggestion.findByIdAndRemove(req.params.id)
      .then(result => res.status(200).json({ deleted: true, result }))
      .catch(err => res.status(404).json(err))
  } else {
    res.status(401).json({ admin: false })
  }
})

module.exports = router;