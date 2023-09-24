const router = require('express').Router();
const usersController = require('../controllers/authController');

router.get('/', usersController.getAllUsers);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.post('/logout', usersController.logout);
router.patch('/update', usersController.updateUser);
router.delete('/delete', usersController.deleteUser);

module.exports = router;
