const fileUtil = require('../utils/fileUtil');
const storageConfig = require('../configs/storageConfig');
const usersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.USERS}`;

async function getUsers(){
    return await fileUtil.readFile(usersStorage);
}

async function getUserByLogin(userLogin){
    let users = await getUsers();
    return users.find(user=>user.login === userLogin) || null;
}

async function addUser(user){
    let users = await getUsers();
    let createdUser = {...user, role:'user', cart:[], orders:[]};
    users.push(createdUser);
    await fileUtil.writeFile(usersStorage, users);
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
    await fileUtil.writeFile(usersStorage, users);
    return changedUser;
}

async function deleteUser(userLogin) {
    let users = await getUsers();
    users = users.filter(user => user.login !== userLogin);
    await fileUtil.writeFile(usersStorage, users);
    return userLogin;
}

module.exports = {getUsers, getUserByLogin, addUser, editUser, deleteUser};