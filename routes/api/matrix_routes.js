const router = require('express').Router();
const db = require('../../models');
const checkAuth = require('../../middleware/checkAuth');

router.use('*', (req, res, next) => {
  console.log('req made it to matrix folder');
  next();
})

router.get('/all', (req, res) => {
  db.Matrix.find()
    .then(mats => res.status(200).json(mats))
    .catch(err => res.status(500).json(err));
})

router.delete('/testdeleteall', (req, res) => {
  db.Matrix.remove()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
})

router.post('/newmatrix', checkAuth, (req, res) => {
  const { gameID, platform, selfRating } = req.body;

  const newMatrix = new db.Matrix({
    userID: req.userId,
    gameID,
    platform,
    selfRating
  })

  newMatrix.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(422).json(err))
})

module.exports = router;