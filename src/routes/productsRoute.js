const express = require('express');
const productsController = require('../controllers/productsController');
const { ROUTES } = require('../constants/productsConstants');
const { authorize } = require('../middlewares/authMiddleware');
const Roles = require('../constants/rolesConstants');

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

module.exports = router;
