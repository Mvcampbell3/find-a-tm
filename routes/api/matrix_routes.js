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



  db.User.findById(req.userID)
    .then(user => {

      const { gameID, platform, selfRating, gamerTag } = req.body;


      if (user.gameIDs.filter(each => each === gameID).length === 0) {


        const platIndex = user.platforms.map(plat => plat.system).indexOf(platform);

        if (platIndex < 0) {
          return res.status(422).json({ msg: 'User does not have that platform registered' })
        }

        const newMatrix = new db.Matrix({
          userID: req.userID,
          gameID,
          platform,
          selfRating,
          gamerTag
        })

        newMatrix.save()
          .then(result => res.status(201).json(result))
          .catch(err => res.status(422).json(err))

      } else {
        res.status(422).json({ msg: 'User already has game matrix' })
      }
    })



})

router.delete('/delete/:id', checkAuth, (req, res) => {
  const user = req.userID;
  console.log(typeof user)
  db.Matrix.findById(req.params.id)
    .then(matrix => {
      console.log(typeof matrix.userID.toString());
      console.log(user)
      if (matrix.userID.toString() === req.userID) {
        // res.json({ msg: 'will delete' })
        matrix.remove()
          .then(result => {
            res.status(200).json({ ok: true, result })
          })
          .catch(err => {
            res.status(422).json(err)
          })
      } else {
        res.json({ msg: 'not right user' })
      }
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

module.exports = router;