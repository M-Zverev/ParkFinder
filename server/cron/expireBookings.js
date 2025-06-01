const cron = require('node-cron');
const { Booking, ParkingLot } = require('../models/models');
const { Op } = require('sequelize');

// Запускаем задачу каждую минуту для проверки истекших бронирований
cron.schedule('* * * * *', async () => {
    const expiredBookings = await Booking.findAll({
        where: {
            status: 'active',
            end_time: { [Op.lt]: new Date() }
        }
    });

    for (const booking of expiredBookings) {
        booking.status = 'expired';
        await booking.save();

        const parkingLot = await ParkingLot.findByPk(booking.parking_lot_id);
        if (parkingLot) {
            parkingLot.available_spots += 1;
            await parkingLot.save();
        }
    }
});