import fileUtil = require('../utils/fileUtil');
import storageConfig = require('../configs/storageConfig');
import { IUser } from '../models/userModel';
const usersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.USERS}`;

async function getUsers(): Promise<IUser[]> {
    return await fileUtil.readFile(usersStorage);
}

async function getUserByLogin(userLogin: string): Promise<IUser> {
    let users = await getUsers();
    return users.find(user => user.login === userLogin)!;
}

async function addUser(
    user: Pick<IUser, 'login' | 'password' | 'email' | 'phoneNumber'>,
): Promise<IUser> {
    let users: IUser[] = await getUsers();
    let createdUser: IUser = { ...user, role: 'user', cart: [], orders: [] };
    users.push(createdUser);
    await fileUtil.writeFile(usersStorage, users);
    return createdUser;
}

async function addOrderToUser(
    userLogin: string,
    orderId: string,
): Promise<string> {
    let users: IUser[] = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            const updatedOrders: string[] = [...user.orders];
            updatedOrders.push(orderId);
            return { ...user, orders: updatedOrders };
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return orderId;
}

async function deleteOrderFromUser(
    userLogin: string,
    orderId: string,
): Promise<string> {
    let users: IUser[] = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedOrders: string[] = user.orders.filter(
                userOrder => userOrder !== orderId,
            );
            return { ...user, orders: updatedOrders };
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return orderId;
}

async function editUser(
    userLogin: string,
    userData: Partial<IUser>,
): Promise<IUser | undefined> {
    let users = await getUsers();
    let changedUser: IUser | undefined;
    users = users.map(user => {
        if (user.login === userLogin) {
            let newUser: IUser = {
                ...user,
                ...userData,
            };
            changedUser = newUser;
            return newUser;
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return changedUser;
}

async function deleteUser(userLogin: string): Promise<string> {
    let users = await getUsers();
    users = users.filter(user => user.login !== userLogin);
    await fileUtil.writeFile(usersStorage, users);
    return userLogin;
}

export {
    getUsers,
    getUserByLogin,
    addUser,
    editUser,
    deleteUser,
    addOrderToUser,
    deleteOrderFromUser,
};
