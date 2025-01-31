import express = require('express');
import * as cartController from '../controllers/cartController';
import { ROUTES } from '../constants/cartConstants';
import { authorize } from '../middlewares/authMiddleware';
import { Roles } from '../constants/rolesConstants';
import { checkPermissions } from '../middlewares/permissionMiddleware';

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

export { router };
