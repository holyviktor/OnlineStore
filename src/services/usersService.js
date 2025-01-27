const usersAccessor = require('../accessors/usersAccessor');
const {
    requiredProperties,
    regExpEmail,
    regExpPhoneNumber,
} = require('../constants/usersConstants');
const newValidationError = require('../utils/validationErrorUtil');
const CustomError = require('../handlers/customError');
const bcrypt = require('bcrypt');

async function getUsers() {
    return usersAccessor.getUsers();
}

async function getUserByLogin(login) {
    let user = await usersAccessor.getUserByLogin(login);
    if (!user) throw new CustomError(404, 'User not found');
    return user;
}

async function editUser(userLogin, userData) {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    let validation = checkUser(userData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    let dataToChange = { ...userData };
    if (userData.password) {
        dataToChange.password = await bcrypt.hash(userData.password, 10);
    }
    return await usersAccessor.editUser(userLogin, dataToChange);
}

async function deleteUser(userLogin) {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    return usersAccessor.deleteUser(userLogin);
}

async function checkIfUserExists(userLogin) {
    let user = await usersAccessor.getUserByLogin(userLogin);
    return !!user;
}

function checkUser(user, isAllRequired) {
    let isLengthCorrect = isAllRequired
        ? Object.keys(user).length === requiredProperties.length
        : Object.keys(user).length > 0;
    let isPropertiesCorrect = Object.keys(user).every(key =>
        requiredProperties.includes(key),
    );
    let isFormatCorrect = isLengthCorrect && isPropertiesCorrect;
    if (!isFormatCorrect) {
        return newValidationError(400, 'User format is not correct!');
    }

    if (user.hasOwnProperty('login') && !user.login) {
        return newValidationError(400, 'User must have login!');
    }
    if (
        user.hasOwnProperty('password') &&
        !user.password &&
        user.password.length < 6
    ) {
        return newValidationError(
            400,
            'Password must be longer then 6 symbols!',
        );
    }
    if (user.hasOwnProperty('email') && !user.email.match(regExpEmail)) {
        return newValidationError(400, 'Wrong email!');
    }
    if (
        user.hasOwnProperty('phoneNumber') &&
        !user.phoneNumber.match(regExpPhoneNumber)
    ) {
        return newValidationError(400, 'Wrong phone number.');
    }
    return {
        status: 200,
        message: '',
        isValid: true,
    };
}

module.exports = {
    getUserByLogin,
    editUser,
    deleteUser,
    getUsers,
    checkIfUserExists,
    checkUser,
};
