const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Модель пользователей
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user', validate: { isIn: [['user', 'admin']] } },
}, {
    tableName: 'users',
    underscored: true
});

// Модель парковок
const ParkingLot = sequelize.define('ParkingLot', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT },
    latitude: { type: DataTypes.DOUBLE, allowNull: false },
    longitude: { type: DataTypes.DOUBLE, allowNull: false },
    total_spots: { type: DataTypes.INTEGER, allowNull: false },
    available_spots: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'parking_lots',
    underscored: true
});

// Модель бронирований
const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    parking_lot_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'parking_lots', key: 'id' } },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'active', validate: { isIn: [['active', 'expired']] } },
}, {
    tableName: 'bookings',
    underscored: true,
    indexes: [
        { fields: ['status', 'end_time'] } // составной индекс
    ]
});

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

ParkingLot.hasMany(Booking, { foreignKey: 'parking_lot_id' });
Booking.belongsTo(ParkingLot, { foreignKey: 'parking_lot_id' });

module.exports = {
    User,
    ParkingLot,
    Booking
};
