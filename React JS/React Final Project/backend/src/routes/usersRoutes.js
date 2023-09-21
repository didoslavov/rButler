const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.route('/').post(usersController.createUser);

module.exports = router;
