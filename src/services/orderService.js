const CustomError = require('../handlers/customError');
const userService = require("./usersService");
const ordersAccessor = require("../accessors/ordersAccessor");
const productService = require("./productsService");

async function getOrders() {
    return ordersAccessor.getOrders();
}

async function getOrderById(orderId) {
    return ordersAccessor.getOrderById(orderId);
}

async function getOrdersByLogin(userLogin) {
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    return ordersAccessor.getUserOrders(userLogin);
}

async function createOrder(userLogin, order){
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    let cost = 0;
    for (const product of order.products) {
        if (!await productService.checkIfProductExists(product.productId)){
            throw new CustomError(404, "Product doesn't exists");
        }
        if (product.count <= 0){
            throw new CustomError(400, "Count to add must be more than 0");
        }
        let currProduct = await productService.getById(product.productId);
        cost += Number(currProduct.price) * product.count;

    }

    let createdOrder = {...order, cost: cost, date: new Date().toLocaleString()};

    return ordersAccessor.createOrder(userLogin, createdOrder);
}

async function deleteOrder(userLogin, orderId){
    if (!await hasUserOrderId(userLogin, orderId)){
        throw new CustomError(404, "User don't have order with this id!");
    }
    return ordersAccessor.deleteOrder(userLogin, orderId)
}

async function hasUserOrderId(userLogin, orderId){
    return (await ordersAccessor.getUserOrdersIds(userLogin)).includes(orderId);
}

module.exports = {getOrders, getOrdersByLogin, createOrder, deleteOrder, getOrderById};
