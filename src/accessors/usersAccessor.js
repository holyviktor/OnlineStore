const fileService = require('./fileAccessor');
const storageConfig = require('../configs/storageConfig');
const usersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.USERS}`;
const keyWord = 'users';

async function getUsers(){
    let productsContent = await fileService.readFile(usersStorage);
    return JSON.parse(productsContent)[keyWord];
}

async function writeUsers(users){
    await fileService.writeFile(usersStorage, JSON.stringify({[keyWord]:users}));
}

async function getUserByLogin(login){
    let users = await getUsers();
    return users.find(user=>user.login === login) || null;
}

async function addUser(user){
    let users = await getUsers();
    let createdUser = {role:'user', ...user, cart:[], orders:[]};
    users.push(createdUser);
    await writeUsers(users);
    return createdUser;
}

async function editUser(userLogin, userData) {
    let users = await getUsers();
    let changedUser;
    users = users.map(user => {
        if (user.login === userLogin) {
            let newUser = {
                ...user,
                ...userData
            };
            changedUser = newUser;
            return newUser;
        }
        return user;
    })
    await writeUsers(users);
    return changedUser;
}

async function deleteUser(userLogin) {
    let users = await getUsers();
    users = users.filter(user => user.login !== userLogin);
    await writeUsers(users);
    return users;
}



module.exports = {getUsers, getUserByLogin, addUser, editUser, deleteUser};