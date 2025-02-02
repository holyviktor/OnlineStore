import { NextFunction, Request, Response } from 'express';
import * as ordersService from '../services/orderService';

async function getOrders(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await ordersService.getOrders());
    } catch (err) {
        next(err);
    }
}

async function getOrderById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
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

async function getUserOrders(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await ordersService.getOrdersByLogin(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}

async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await ordersService.createOrder(req.params.userLogin, req.body),
        );
    } catch (err) {
        next(err);
    }
}

async function deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await ordersService.deleteOrder(
                req.params.userLogin,
                req.params.orderId,
            ),
        );
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export { getOrders, getOrderById, getUserOrders, createOrder, deleteOrder };
