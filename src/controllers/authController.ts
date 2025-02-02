import * as authService from '../services/authService';
import { NextFunction, Response, Request } from 'express';

async function createUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await authService.addUser(req.body));
    } catch (err) {
        next(err);
    }
}

async function loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { login, password } = req.body;
        res.json(await authService.loginUser(login, password));
    } catch (err) {
        next(err);
    }
}

export { createUser, loginUser };
