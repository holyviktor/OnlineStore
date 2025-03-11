import { NextFunction, Request, Response } from 'express';
import * as productsService from '../services/productsService';
import { querySchema } from '../models/productQueryValidationModel';
import { CustomError } from '../handlers/customError';

async function getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const result = querySchema.safeParse(req.query);

        if (!result.success) {
            throw new CustomError(400, 'Wrong parameters format');
        }
        res.json(await productsService.getProducts(result.data));
    } catch (err) {
        next(err);
    }
}

async function getProductsByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await productsService.getProductsByCategory(req.params.categoryId),
        );
    } catch (err) {
        next(err);
    }
}
async function getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await productsService.getProductById(req.params.productId));
    } catch (err) {
        next(err);
    }
}

async function addProduct(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await productsService.addProduct(req.body));
    } catch (err) {
        next(err);
    }
}

async function editProducts(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(
            await productsService.editProduct(req.params.productId, req.body),
        );
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await productsService.deleteProduct(req.params.productId));
    } catch (err) {
        next(err);
    }
}

export {
    getProducts,
    addProduct,
    editProducts,
    getProductsByCategory,
    deleteProduct,
    getProductById,
};
