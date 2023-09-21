const router = require('express').Router();
const usersController = require('../controllers/usersController');

router
    .route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
