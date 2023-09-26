const router = require('express').Router();
const householdController = require('../controllers/householdsController.js');
const auth = require('../middlewares/auth.js');

router.route('/').get(householdController.getAllHouseholds);
router.route('/user-households/:userId').get(auth(), householdController.getUserHouseholds);
router.route('/create').post(auth(), householdController.createHouseholds);
router.route('/update').patch(auth(), householdController.updateHouseholds);
router.route('/delete').delete(auth(), householdController.deleteHouseholds);

module.exports = router;
