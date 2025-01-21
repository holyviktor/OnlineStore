const express = require('express');
const ordersController = require('../controllers/ordersController');
const {ROUTES} = require('../constants/orderConstants');

const router = express.Router();

router.get(ROUTES.GET, ordersController.getOrders);
router.get(ROUTES.GET_BY_ID, ordersController.getOrderById);
router.get(ROUTES.GET_USER_ORDERS, ordersController.getUserOrders);
router.post(ROUTES.CREATE, ordersController.createOrder);
router.delete(ROUTES.DELETE, ordersController.deleteOrder);

module.exports = router;