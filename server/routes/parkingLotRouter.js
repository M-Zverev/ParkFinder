const express = require('express');
const router = express.Router();
const parkingLotController = require('../controllers/parkingLotController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('admin'), parkingLotController.create);
router.get('/', parkingLotController.getAll);
router.get('/:id', parkingLotController.getOne);

module.exports = router;