const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

const ROUTES = {
    GET: '/',
    GET_BY_ID: '/:productId',
    GET_BY_CATEGORY: '/category/:categoryId',
    ADD: '/add',
    DELETE: '/delete',
    EDIT: '/edit'
}

router.get(ROUTES.GET, productsController.getProducts);

router.get(ROUTES.GET_BY_CATEGORY, productsController.getProductsByCategory);

router.get(ROUTES.GET_BY_ID, productsController.getProductById);

router.post(ROUTES.ADD, productsController.addProduct);

router.put(ROUTES.EDIT, productsController.editProducts);

router.delete(ROUTES.DELETE, productsController.deleteProduct);

module.exports = router;