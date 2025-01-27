const ordersService = require('../services/orderService');

async function getOrders(req, res, next) {
    try {
        res.json(await ordersService.getOrders());
    } catch (err) {
        next(err);
    }
}

async function getOrderById(req, res, next) {
    try {
        res.json(
            await ordersService.getOrderById(
                req.params.userLogin,
                req.params.orderId,
            ),
        );
    } catch (err) {
        next(err);
    }
}

async function getUserOrders(req, res, next) {
    try {
        res.json(await ordersService.getOrdersByLogin(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}

async function createOrder(req, res, next) {
    try {
        res.json(
            await ordersService.createOrder(req.params.userLogin, req.body),
        );
    } catch (err) {
        next(err);
    }
}

async function deleteOrder(req, res, next) {
    try {
        res.json(
            await ordersService.deleteOrder(
                req.params.userLogin,
                req.params.orderId,
            ),
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOrders,
    getOrderById,
    getUserOrders,
    createOrder,
    deleteOrder,
};
