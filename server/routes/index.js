const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const bookingRouter = require('./bookingRouter');
const parkingLotRouter = require('./parkingLotRouter');

router.use('/user', userRouter);
router.use('/booking', bookingRouter);
router.use('/parkingLot', parkingLotRouter);

module.exports = router;