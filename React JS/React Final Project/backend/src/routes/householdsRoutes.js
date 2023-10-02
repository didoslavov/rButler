const router = require('express').Router();
const householdController = require('../controllers/householdsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.route('/').get(householdController.getAllHouseholds);
router.route('/create').post(authMiddleware(), householdController.createHouseholds);
router.route('/user-households/:userId').get(authMiddleware(), householdController.getUserHouseholds);
router.route('/update/:householdId').patch(authMiddleware(), householdController.updateHouseholds);
router.route('/delete/:householdId').delete(authMiddleware(), householdController.deleteHouseholds);
router.route('/:householdId/add-member').post(authMiddleware(), householdController.addHouseholdMember);
router.route('/:householdId').get(authMiddleware(), householdController.getHouseholdById);

module.exports = router;
