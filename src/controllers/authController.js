const authService = require('../services/authService');

async function createUser(req, res, next) {
    try {
        res.json(await authService.addUser(req.body));
    } catch (err) {
        next(err);
    }
}

async function loginUser(req, res, next) {
    try {
        const { login, password } = req.body;
        res.json(await authService.loginUser(login, password));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    loginUser,
};
