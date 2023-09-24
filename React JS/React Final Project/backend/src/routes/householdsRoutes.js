const router = require('express').Router();
const householdController = require('../controllers/householdsController.js');

router.route('/').get(householdController.getAllHouseholds);
router.route('/user-households/:userId').get(householdController.getUserHouseholds);
router.route('/create').post(householdController.createHouseholds);
router.route('/update').patch(householdController.updateHouseholds);
router.route('/delete').delete(householdController.deleteHouseholds);

module.exports = router;
