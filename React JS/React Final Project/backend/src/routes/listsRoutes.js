const listsRouter = require('express').Router();
const listsController = require('../controllers/listsController');

listsRouter.route('/').get(listsController.getAllLists);
listsRouter.route('/create').post(listsController.createList);
listsRouter.route('/:listId/add-item').post(listsController.addItem);
listsRouter.route('/:listId').get(listsController.getListById);

module.exports = listsRouter;
