const router = require('express').Router();
const user_routes = require('./user-routes');
const game_routes = require('./game-routes');
const matrix_routes = require('./matrix_routes');
const suggestion_routes = require('./suggestion-routes');

router.use('*', (req, res, next) => {
  console.log('req made it api folder');
  next();
})

router.use('/user', user_routes);
router.use('/game', game_routes);
router.use('/matrix', matrix_routes);
router.use('/suggestion', suggestion_routes);

router.get('/', (req, res) => {
  res.json({ api: true })
})

module.exports = router;