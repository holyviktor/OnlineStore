import { v4 as uuidv4 } from 'uuid';
import fileUtil = require('../utils/fileUtil');
import storageConfig = require('../configs/storageConfig');
import { getUserByLogin } from './usersAccessor';
import { IOrder } from '../models/orderModel';
import { IUser } from '../models/userModel';

const ordersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.ORDERS}`;

async function getOrders(): Promise<IOrder[]> {
    return fileUtil.readFile(ordersStorage);
}

async function getUserOrdersIds(userLogin: string): Promise<string[]> {
    let user: IUser = await getUserByLogin(userLogin);
    return user['orders'];
}

async function getUserOrders(userLogin: string): Promise<IOrder[]> {
    let userOrdersIds: string[] = await getUserOrdersIds(userLogin);
    let orders: IOrder[] = await getOrders();
    orders = orders.filter(order => userOrdersIds.includes(order.id));
    return orders;
}

async function getOrderById(orderId: string): Promise<IOrder | null> {
    let orders: IOrder[] = await getOrders();
    return orders.find(order => order.id === orderId) || null;
}

async function createOrder(order: Omit<IOrder, 'id'>): Promise<string> {
    let orders = await getOrders();
    let orderId: string = uuidv4();
    orders.push({ ...order, id: orderId });
    await fileUtil.writeFile(ordersStorage, orders);
    return orderId;
}

async function deleteOrder(orderId: string): Promise<string> {
    let orders = await getOrders();
    orders = orders.filter(order => order.id !== orderId);
    await fileUtil.writeFile(ordersStorage, orders);
    return orderId;
}

export {
    getOrders,
    getUserOrdersIds,
    getOrderById,
    createOrder,
    deleteOrder,
    getUserOrders,
};
