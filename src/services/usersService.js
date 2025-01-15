const usersAccessor = require('../accessors/usersAccessor');

const requiredProperties = ["login", "password", "email", "phoneNumber"];
const regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpPhoneNumber = /^(?:\+380|380|0)\d{9}$/;

async function getUsers(){
    return usersAccessor.getUsers();
}

async function getUserByLogin(login){
    let user = usersAccessor.getUserByLogin(login);
    if (!user) throw new Error('User not found');
    return user;
}

async function addUser(user) {
    if (user.login && await checkIfUserExists(user.login)){
        throw new Error("User with this login already exists");
    }
    checkUser(user);
    return await usersAccessor.addUser(user);
}

async function editUser(userLogin, userData){
    if (!await checkIfUserExists(userLogin)){
        throw new Error("User doesn't exists");
    }
    checkUser(userData);
    return await usersAccessor.editUser(userLogin, userData)
}

async function deleteUser(userLogin){
    if (!await checkIfUserExists(userLogin)){
        throw new Error("User doesn't exists");
    }
    return await usersAccessor.deleteUser(userLogin)
}

async function checkIfUserExists(userLogin){
    let users = await usersAccessor.getUsers();
    return users.some(user=>user.login === userLogin);
}

function checkUser(user){
    let isFormatCorrect = Object.keys(user).length === requiredProperties.length &&
        requiredProperties.every((key) => user.hasOwnProperty(key));
    if (!isFormatCorrect){
        throw new Error("User format is not correct!");
    }
    if (!user.login){
        throw new Error("Login is empty");
    }
    if (!user.password && user.password.length<6){
        throw new Error("Password must be longer then 6 symbols!");
    }
    if (!user.email.match(regExpEmail)){
        throw new Error("Wrong email!");
    }
    if (!user.phoneNumber.match(regExpPhoneNumber)){
        throw new Error("Wrong phone number.");
    }
}
module.exports = {getUserByLogin, editUser, addUser, deleteUser, getUsers}