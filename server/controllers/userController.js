const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const {User} = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
} 

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }
        // Проверяем, существует ли пользователь с таким email
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password_hash: hashPassword, role});
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password_hash);
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'));
        }
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();