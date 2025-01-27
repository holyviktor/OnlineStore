const userService = require('../services/usersService');

async function getUsers(req, res, next) {
    try {
        res.json(await userService.getUsers());
    } catch (err) {
        next(err);
    }
}

async function getUserByLogin(req, res, next) {
    try {
        res.json(await userService.getUserByLogin(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}

async function editUser(req, res, next) {
    try {
        res.json(await userService.editUser(req.params.userLogin, req.body));
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        res.json(await userService.deleteUser(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}
module.exports = { getUserByLogin, editUser, deleteUser, getUsers };
