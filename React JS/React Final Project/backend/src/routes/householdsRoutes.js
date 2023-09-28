const router = require('express').Router();
const householdController = require('../controllers/householdsController.js');
const auth = require('../middlewares/auth.js');

router.route('/').get(householdController.getAllHouseholds);
router.route('/:householdId').get(auth(), householdController.getHouseholdById);
router.route('/user-households/:userId').get(auth(), householdController.getUserHouseholds);
router.route('/add-member').post(auth(), householdController.addHouseholdMember);
router.route('/create').post(auth(), householdController.createHouseholds);
router.route('/update').patch(auth(), householdController.updateHouseholds);
router.route('/delete').delete(auth(), householdController.deleteHouseholds);

module.exports = router;
