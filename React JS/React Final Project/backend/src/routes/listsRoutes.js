const listsRouter = require('express').Router();
const listsController = require('../controllers/listsController');
const authMiddleware = require('../middlewares/authMiddleware.js');

listsRouter.route('/').get(listsController.getAllLists);
listsRouter.route('/create').post(authMiddleware, listsController.createList);
listsRouter.route('/:listId/delete').delete(authMiddleware, listsController.deleteList);
listsRouter.route('/:listId/add-item').post(authMiddleware, listsController.addItem);
listsRouter.route('/:listId/delete-item/:itemId').delete(authMiddleware, listsController.deleteItem);
listsRouter.route('/:listId').get(authMiddleware, listsController.getListById);

module.exports = listsRouter;
