const router = require('express').Router();
const user_routes = require('./user-routes');

router.get('/', user_routes);

module.exports = router;