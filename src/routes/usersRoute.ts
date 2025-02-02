import express = require('express');
import * as usersController from '../controllers/usersController';
import * as authController from '../controllers/authController';
import { ROUTES } from '../constants/usersConstants';
import { authorize } from '../middlewares/authMiddleware';
import { checkPermissions } from '../middlewares/permissionMiddleware';
import { Roles } from '../constants/rolesConstants';

const router = express.Router();

router.get(ROUTES.GET, authorize(Roles.Admin), usersController.getUsers);
router.get(ROUTES.LOGIN, authController.loginUser);
router.get(
    ROUTES.GET_BY_LOGIN,
    authorize(Roles.All),
    checkPermissions,
    usersController.getUserByLogin,
);

router.post(ROUTES.REGISTER, authController.createUser);

router.put(
    ROUTES.EDIT,
    authorize(Roles.All),
    checkPermissions,
    usersController.editUser,
);

router.delete(
    ROUTES.DELETE,
    authorize(Roles.All),
    checkPermissions,
    usersController.deleteUser,
);

export { router };
