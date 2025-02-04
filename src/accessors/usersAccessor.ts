import { IUser } from '../models/userModel';
import User from '../schemas/userSchema';
import mapUser from '../mappers/userMapper';

async function getUsers(): Promise<IUser[]> {
    let users = await User.find();
    return users.map(user => mapUser(user));
}

async function getUserByLogin(userLogin: string): Promise<IUser | null> {
    const user = await User.findOne({ login: userLogin });
    return user ? mapUser(user) : null;
}

async function addUser(
    user: Pick<IUser, 'login' | 'password' | 'email' | 'phoneNumber'>,
): Promise<IUser> {
    let createdUser = new User({ ...user, role: 'user', cart: [], orders: [] });
    await createdUser.save();
    return mapUser(createdUser);
}

async function addOrderToUser(
    userLogin: string,
    orderId: string,
): Promise<string> {
    await User.updateOne({ login: userLogin }, { $push: { orders: orderId } });
    return orderId;
}

async function deleteOrderFromUser(
    userLogin: string,
    orderId: string,
): Promise<string> {
    await User.updateOne({ login: userLogin }, { $pull: { orders: orderId } });
    return orderId;
}

async function editUser(
    userLogin: string,
    userData: Partial<IUser>,
): Promise<IUser | null> {
    await User.updateOne({ login: userLogin }, { $set: { userData } });
    return getUserByLogin(userLogin);
}

async function deleteUser(userLogin: string): Promise<string> {
    await User.deleteOne({ login: userLogin });
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
