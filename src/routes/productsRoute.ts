import express = require('express');
import * as productsController from '../controllers/productsController';
import { ROUTES } from '../constants/productsConstants';
import { authorize } from '../middlewares/authMiddleware';
import { Roles } from '../constants/rolesConstants';

const router = express.Router();

router.get(ROUTES.GET, productsController.getProducts);
router.get(ROUTES.GET_BY_CATEGORY, productsController.getProductsByCategory);
router.get(ROUTES.GET_BY_ID, productsController.getProductById);

router.post(ROUTES.ADD, authorize(Roles.Admin), productsController.addProduct);

router.put(
    ROUTES.EDIT,
    authorize(Roles.Admin),
    productsController.editProducts,
);

router.delete(
    ROUTES.DELETE,
    authorize(Roles.Admin),
    productsController.deleteProduct,
);

export { router };
