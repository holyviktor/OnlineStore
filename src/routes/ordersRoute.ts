import express = require('express');
import ordersController = require('../controllers/ordersController');
import { ROUTES } from '../constants/orderConstants';
import { authorize } from '../middlewares/authMiddleware';
import { Roles } from '../constants/rolesConstants';
import { checkPermissions } from '../middlewares/permissionMiddleware';

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

export { router };
