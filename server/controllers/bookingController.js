const { Booking, ParkingLot } = require('../models/models');
const ApiError = require('../error/ApiError');

class BookingController {
    async create(req, res, next) {
        const { user_id, parking_lot_id, start_time, end_time } = req.body;
        const transaction = await Booking.sequelize.transaction();

        // Получаем парковку
        const parkingLot = await ParkingLot.findByPk(parking_lot_id, { transaction });

        if (!parkingLot) {
            await transaction.rollback();
            return next(ApiError.notFound('Парковка не найдена'));
        }

        // Проверяем доступные места
        if (parkingLot.available_spots <= 0) {
            await transaction.rollback();
            return next(ApiError.badRequest('Нет свободных мест на парковке'));
        }

        const booking = await Booking.create({ user_id, parking_lot_id, start_time, end_time }, { transaction });

        // Обновляем количество свободных мест
        parkingLot.available_spots -= 1;
        await parkingLot.save({ transaction });
        await transaction.commit();

        return res.json(booking);
    }

    async getAll(req, res) {
        const bookings = await Booking.findAll();
        return res.json(bookings);
    }

    async getActiveBookings(req, res) {
        const { user_id } = req.query;

        const bookings = await Booking.findAll({
            where: {
                user_id,
                status: 'active'
            },
            include: [
                { model: ParkingLot }
            ],
            order: [['start_time', 'DESC']]
        });

        return res.json(bookings);
    }
}

module.exports = new BookingController();