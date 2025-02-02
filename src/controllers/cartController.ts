import * as cartService from '../services/cartService';
import { NextFunction, Response, Request } from 'express';

async function getByLogin(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await cartService.getCartByLogin(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}

async function add(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { productId, count } = req.body;
        res.json(
            await cartService.addToCart(req.params.userLogin, productId, count),
        );
    } catch (err) {
        next(err);
    }
}

async function clear(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await cartService.clearFromCart(
                req.params.userLogin,
                req.params.productId,
            ),
        );
    } catch (err) {
        next(err);
    }
}

async function subtract(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await cartService.subtractFromCart(
                req.params.userLogin,
                req.params.productId,
            ),
        );
    } catch (err) {
        next(err);
    }
}

async function set(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { productId, count } = req.body;
        res.json(
            await cartService.setToCart(req.params.userLogin, productId, count),
        );
    } catch (err) {
        next(err);
    }
}

export { getByLogin, add, set, clear, subtract };
