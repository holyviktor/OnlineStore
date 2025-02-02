import { NextFunction, Request, Response } from 'express';

import * as userService from '../services/usersService';

async function getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await userService.getUsers());
    } catch (err) {
        next(err);
    }
}

async function getUserByLogin(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await userService.getUserByLogin(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}

async function editUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await userService.editUser(req.params.userLogin, req.body));
    } catch (err) {
        next(err);
    }
}

async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await userService.deleteUser(req.params.userLogin));
    } catch (err) {
        next(err);
    }
}
export { getUserByLogin, editUser, deleteUser, getUsers };
