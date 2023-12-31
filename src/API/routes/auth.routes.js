const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');
const authHandler = require('../middlewares/auth.handler');
const { loginUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new AuthService();

router.post('/login',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(service.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const recovery = await service.sendRecovery(email);
            res.json(recovery);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/change-password',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;
            const passwordChanged = await service.changePassword(token, newPassword);
            res.json(passwordChanged);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;