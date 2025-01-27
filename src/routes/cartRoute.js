const express = require('express');
const cartController = require('../controllers/cartController');
const { ROUTES } = require('../constants/cartConstants');
const { authorize } = require('../middlewares/authMiddleware');
const Roles = require('../constants/rolesConstants');
const { checkPermissions } = require('../middlewares/permissionMiddleware');

const router = express.Router();

router.get(
    ROUTES.GET,
    authorize(Roles.All),
    checkPermissions,
    cartController.getByLogin,
);

router.post(
    ROUTES.ADD,
    authorize(Roles.All),
    checkPermissions,
    cartController.add,
);

router.put(
    ROUTES.SET,
    authorize(Roles.All),
    checkPermissions,
    cartController.set,
);
router.put(
    ROUTES.SUBTRACT,
    authorize(Roles.All),
    checkPermissions,
    cartController.subtract,
);

router.delete(
    ROUTES.CLEAR,
    authorize(Roles.All),
    checkPermissions,
    cartController.clear,
);

module.exports = router;
