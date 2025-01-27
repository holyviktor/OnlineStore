const productsService = require('../services/productsService');

async function getProducts(req, res, next) {
    try {
        res.json(await productsService.getProducts());
    } catch (err) {
        next(err);
    }
}

async function getProductsByCategory(req, res, next) {
    try {
        res.json(
            await productsService.getProductsByCategory(req.params.categoryId),
        );
    } catch (err) {
        next(err);
    }
}
async function getProductById(req, res, next) {
    try {
        res.json(await productsService.getProductById(req.params.productId));
    } catch (err) {
        next(err);
    }
}

async function addProduct(req, res, next) {
    try {
        res.json(await productsService.addProduct(req.body));
    } catch (err) {
        next(err);
    }
}

async function editProducts(req, res, next) {
    try {
        res.json(
            await productsService.editProduct(req.params.productId, req.body),
        );
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        res.json(await productsService.deleteProduct(req.params.productId));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProducts,
    addProduct,
    editProducts,
    getProductsByCategory,
    deleteProduct,
    getProductById,
};
