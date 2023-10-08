const householdsRouter = require('express').Router();
const householdController = require('../controllers/householdsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

householdsRouter.route('/').get(householdController.getAllHouseholds);
householdsRouter.route('/create').post(authMiddleware, householdController.createHouseholds);
householdsRouter.route('/user-households/:userId').get(authMiddleware, householdController.getUserHouseholds);
householdsRouter.route('/update/:householdId').patch(authMiddleware, householdController.updateHouseholds);
householdsRouter.route('/delete/:householdId').delete(authMiddleware, householdController.deleteHouseholds);
householdsRouter.route('/:householdId/add-member').post(authMiddleware, householdController.addHouseholdMember);
householdsRouter.route('/:householdId/remove-member').post(authMiddleware, householdController.removeHouseholdMember);
householdsRouter.route('/:householdId').get(householdController.getHouseholdById);

module.exports = householdsRouter;
