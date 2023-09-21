const router = require('express').Router();
const householdController = require('../controllers/householdsController.js');

router
    .route('/')
    .get(householdController.getAllHouseholds)
    .post(householdController.createHouseholds)
    .patch(householdController.updateHouseholds)
    .delete(householdController.deleteHouseholds);

module.exports = router;
