const usersRouter = require('express').Router();
const usersController = require('../controllers/authController');

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/login', usersController.login);
usersRouter.post('/register', usersController.register);
usersRouter.post('/logout', usersController.logout);
usersRouter.patch('/update', usersController.updateUser);
usersRouter.delete('/delete', usersController.deleteUser);

module.exports = usersRouter;
