import { IOrder } from '../models/orderModel';
import Order from '../schemas/orderSchema';
import User from '../schemas/userSchema';
import mapOrder from '../mappers/orderMapper';

async function getOrders(): Promise<IOrder[]> {
    let orders = await Order.find();
    return orders.map(order => mapOrder(order));
}

async function getUserOrdersIds(userLogin: string): Promise<string[] | null> {
    const data = await User.findOne({ login: userLogin }).select('orders');
    return data?.orders.map(value => value._id.toString()) || null;
}

async function getUserOrders(userLogin: string): Promise<IOrder[]> {
    let userOrdersIds = await getUserOrdersIds(userLogin);
    let orders = await Order.find({ _id: { $in: userOrdersIds } });
    return orders.map(order => mapOrder(order));
}

async function getOrderById(orderId: string): Promise<IOrder | null> {
    let order = await Order.findById(orderId);
    return order ? mapOrder(order) : null;
}

async function createOrder(order: Omit<IOrder, 'id'>): Promise<string> {
    let createdOrder = new Order(order);
    await createdOrder.save();
    return createdOrder.id;
}

async function deleteOrder(orderId: string): Promise<string> {
    await Order.deleteOne({ _id: orderId });
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
