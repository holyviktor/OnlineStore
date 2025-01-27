const bcrypt = require('bcrypt');
require('dotenv').config();
const CustomError = require('../handlers/customError');
const usersService = require('./usersService');
const usersAccessor = require('../accessors/usersAccessor');
const jwt = require('jsonwebtoken');

async function loginUser(login, password) {
    const user = await usersService.getUserByLogin(login);
    if (!(await bcrypt.compare(password, user.password))) {
        throw new CustomError(400, 'Wrong login or password!');
    }
    return issueToken({ login: user.login, role: user.role });
}

async function addUser(user) {
    if (user.login && (await usersService.checkIfUserExists(user.login))) {
        throw new CustomError(400, 'User with this login already exists');
    }
    let validation = usersService.checkUser(user, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return usersAccessor.addUser({ ...user, password: hashedPassword });
}

function issueToken(user) {
    return jwt.sign({ ...user, iss: 'Node-Auth' }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRY_TIME,
    });
}

module.exports = {
    loginUser,
    addUser,
};
