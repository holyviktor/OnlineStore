const usersAccessor = require('../accessors/usersAccessor');
const {requiredProperties, regExpEmail, regExpPhoneNumber} = require('../constants/usersConstants');
const newValidationError = require('../utils/validationErrorUtil');

async function getUsers(){
    return usersAccessor.getUsers();
}

async function getUserByLogin(login){
    let user = usersAccessor.getUserByLogin(login);
    if (!user) throw new CustomError(404, 'User not found');
    return user;
}

async function addUser(user) {
    if (user.login && await checkIfUserExists(user.login)){
        throw new CustomError(400,"User with this login already exists");
    }
    let validation = checkUser(user, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await usersAccessor.addUser(user);
}

async function editUser(userLogin, userData){
    if (!await checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    let validation = checkUser(userData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await usersAccessor.editUser(userLogin, userData)
}

async function deleteUser(userLogin){
    if (!await checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    return await usersAccessor.deleteUser(userLogin)
}

async function checkIfUserExists(userLogin){
    let users = await usersAccessor.getUsers();
    return users.some(user=>user.login === userLogin);
}

function checkUser(user, isAllRequired){
    let validation = {
        status:200,
        message: "",
        isValid: true
    }

    let isFormatCorrect = (isAllRequired ? Object.keys(user).length === requiredProperties.length :
        Object.keys(user).length > 0) && Object.keys(user).every((key) => requiredProperties.includes(key));
    if (!isFormatCorrect){
        return newValidationError(validation, 400, "User format is not correct!");
    }

    if (user.hasOwnProperty('login') && !user.login) {
        return newValidationError(validation, 400, "User must have login!");
    }
    if (user.hasOwnProperty('password') && !user.password && user.password.length<6){
        return newValidationError(validation, 400, "Password must be longer then 6 symbols!");
    }
    if (user.hasOwnProperty('email') && !user.email.match(regExpEmail)){
        return newValidationError(validation, 400, "Wrong email!");
    }
    if (user.hasOwnProperty('phoneNumber') && !user.phoneNumber.match(regExpPhoneNumber)){
        return newValidationError(validation, 400, "Wrong phone number.");
    }
    return validation;
}



module.exports = {getUserByLogin, editUser, addUser, deleteUser, getUsers}