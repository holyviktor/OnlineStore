const { v4: uuidv4 } = require('uuid');
const fileUtil = require('../utils/fileUtil');
const storageConfig = require('../configs/storageConfig');
const { getUserByLogin, getUsers } = require('./usersAccessor');
const { getProducts } = require('./productsAccessor');

const ordersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.ORDERS}`;
const usersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.USERS}`;

async function getOrders() {
    return fileUtil.readFile(ordersStorage);
}

async function getUserOrdersIds(userLogin) {
    let user = await getUserByLogin(userLogin);
    return user['orders'];
}

async function getUserOrders(userLogin) {
    let userOrdersIds = await getUserOrdersIds(userLogin);
    let orders = await getOrders();
    orders = orders.filter(order => userOrdersIds.includes(order.id));
    let productsIds = orders?.products.map(product => product.id);
    orders.products = await getProducts().filter(product =>
        productsIds.includes(product.id),
    );
    return orders;
}

async function getOrderById(orderId) {
    let orders = await getOrders();
    return orders.find(order => order.id === orderId) || null;
}

async function createOrder(order) {
    order.id = uuidv4();
    let orders = await getOrders();
    orders.push(order);
    await fileUtil.writeFile(ordersStorage, orders);
    return order.id;
}

async function deleteOrder(userLogin, orderId) {
    let orders = await getOrders();
    orders = orders.filter(order => order.id !== orderId);

    let users = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedOrders = [...user.orders];
            updatedOrders = updatedOrders.filter(
                userOrder => userOrder !== orderId,
            );
            return { ...user, orders: updatedOrders };
        }
        return user;
    });

    await fileUtil.writeFile(ordersStorage, orders);
    await fileUtil.writeFile(usersStorage, users);
    return orderId;
}

module.exports = {
    getOrders,
    getUserOrdersIds,
    getOrderById,
    createOrder,
    deleteOrder,
    getUserOrders,
};
