import { NextFunction, Request, Response } from 'express';
import categoriesService = require('../services/categoriesService');

async function getCategories(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await categoriesService.getCategories());
    } catch (err) {
        next(err);
    }
}

async function getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await categoriesService.getCategoryById(req.params.categoryId),
        );
    } catch (err) {
        next(err);
    }
}

async function addCategory(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await categoriesService.addCategory(req.body));
    } catch (err) {
        next(err);
    }
}

async function editCategory(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await categoriesService.editCategory(
                req.params.categoryId,
                req.body,
            ),
        );
    } catch (err) {
        next(err);
    }
}

async function deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await categoriesService.deleteCategory(req.params.categoryId));
    } catch (err) {
        next(err);
    }
}

export {
    getCategories,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
};
