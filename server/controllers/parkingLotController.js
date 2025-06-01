const {ParkingLot} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class ParkingLotController {
    async create(req, res, next) {
        try {
            const { name, address, latitude, longitude, total_spots, available_spots } = req.body;
            const { img } = req.files;
            let imgName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', imgName));

            const parkingLot = await ParkingLot.create({ name, address, latitude, longitude, total_spots, available_spots, img: imgName });   
            return res.json(parkingLot);
        } catch (error) {
            console.error(error);
            return next(ApiError.badRequest('Ошибка при создании парковки'));
        }
    }

    async getAll(req, res) {
    const parkingLots = await ParkingLot.findAll({
        order: [['available_spots', 'DESC']] 
    });
    return res.json(parkingLots);
}

    async getOne(req, res, next) {
        const { id } = req.params;
        const parkingLot = await ParkingLot.findByPk(id);

        if (!parkingLot) {
            return next(ApiError.notFound('Парковка не найдена'));
        }

        return res.json(parkingLot);
    }
}

module.exports = new ParkingLotController();