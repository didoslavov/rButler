const listsRouter = require('express').Router();
const listsController = require('../controllers/listsController');

listsRouter.route('/').get(listsController.getAllLists);
listsRouter.route('/create').post(listsController.createList);

module.exports = listsRouter;
