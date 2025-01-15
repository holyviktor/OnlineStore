const express = require('express');
const productsController = require('../controllers/productsController');
const {ROUTES} = require('../constants/productsConstants');

const router = express.Router();

router.get(ROUTES.GET, productsController.getProducts);

router.get(ROUTES.GET_BY_CATEGORY, productsController.getProductsByCategory);

router.get(ROUTES.GET_BY_ID, productsController.getProductById);

router.post(ROUTES.ADD, productsController.addProduct);

router.put(ROUTES.EDIT, productsController.editProducts);

router.delete(ROUTES.DELETE, productsController.deleteProduct);

module.exports = router;