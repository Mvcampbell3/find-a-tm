const router = require('express').Router();
const db = require('../../models');
const checkAuth = require("../../middleware/checkAuth")


router.use('*', (req, res, next) => {
  console.log('req made it to suggestion folder');
  next();
})

router.get('/checkAuth', checkAuth, (req, res) => {
  if (req.userID === process.env.ADMIN_ID) {
    res.status(200).json({ admin: true })
  } else {
    res.status(401).json({ admin: false })
  }
})

router.get('/', checkAuth, (req, res) => {
  if (req.userID === process.env.ADMIN_ID) {
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

router.delete('/delete/:id', checkAuth, (req, res) => {
  if (req.userID === process.env.ADMIN_ID) {
    db.Suggestion.findByIdAndRemove(req.params.id)
      .then(result => res.status(200).json({ deleted: true, result }))
      .catch(err => res.status(404).json(err))
  } else {
    res.status(401).json({ admin: false })
  }
})

router.put('/added/:id', checkAuth, (req, res) => {
  if (req.userID === process.env.ADMIN_ID) {
    db.Suggestion.findByIdAndUpdate(req.params.id, { added: !req.body.added }, { new: true })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(404).json(err))
  } else {
    res.status(401).json({ admin: false })
  }
})

module.exports = router;