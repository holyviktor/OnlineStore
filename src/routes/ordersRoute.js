const express = require('express');
const ordersController = require('../controllers/ordersController');
const { ROUTES } = require('../constants/orderConstants');
const { authorize } = require('../middlewares/authMiddleware');
const Roles = require('../constants/rolesConstants');
const { checkPermissions } = require('../middlewares/permissionMiddleware');

const router = express.Router();

router.get(ROUTES.GET, authorize(Roles.Admin), ordersController.getOrders);
router.get(
    ROUTES.GET_BY_ID,
    authorize(Roles.All),
    checkPermissions,
    ordersController.getOrderById,
);
router.get(
    ROUTES.GET_USER_ORDERS,
    authorize(Roles.All),
    checkPermissions,
    ordersController.getUserOrders,
);

router.post(
    ROUTES.CREATE,
    authorize(Roles.All),
    checkPermissions,
    ordersController.createOrder,
);

router.delete(
    ROUTES.DELETE,
    authorize(Roles.All),
    checkPermissions,
    ordersController.deleteOrder,
);

module.exports = router;
