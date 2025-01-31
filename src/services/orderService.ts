import { CustomError } from '../handlers/customError';
import * as userService from '../services/usersService';
import * as ordersAccessor from '../accessors/ordersAccessor';
import { addOrderToUser } from '../accessors/usersAccessor';
import { checkIfProductExists, getProductById } from './productsService';
import { IOrder } from '../models/orderModel';

async function getOrders() {
    return ordersAccessor.getOrders();
}

async function getOrderById(userLogin: string, orderId: string) {
    let order = await ordersAccessor.getOrderById(orderId);
    if (!order) {
        throw new CustomError(404, "Order doesn't exists");
    }
    return order;
}

async function getOrdersByLogin(userLogin: string) {
    if (!(await userService.checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    return ordersAccessor.getUserOrders(userLogin);
}

async function createOrder(userLogin: string, order: Pick<IOrder, 'products'>) {
    if (!(await userService.checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    let cost = 0;
    for (const product of order.products) {
        if (!(await checkIfProductExists(product.productId))) {
            throw new CustomError(404, "Product doesn't exists");
        }
        if (product.count <= 0) {
            throw new CustomError(400, 'Count to add must be more than 0');
        }
        let currProduct = await getProductById(product.productId);
        cost += Number(currProduct.price) * product.count;
    }

    let createdOrder = {
        ...order,
        cost: cost,
        date: new Date().toLocaleString(),
    };

    let orderId = await ordersAccessor.createOrder(createdOrder);
    return addOrderToUser(userLogin, orderId);
}

async function deleteOrder(userLogin: string, orderId: string) {
    if (!(await hasUserOrderId(userLogin, orderId))) {
        throw new CustomError(404, "User don't have order with this id!");
    }
    return ordersAccessor.deleteOrder(userLogin, orderId);
}

async function hasUserOrderId(
    userLogin: string,
    orderId: string,
): Promise<boolean> {
    return (await ordersAccessor.getUserOrdersIds(userLogin)).includes(orderId);
}

export { getOrders, getOrdersByLogin, createOrder, deleteOrder, getOrderById };
