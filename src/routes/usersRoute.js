const express = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const { ROUTES } = require('../constants/usersConstants');
const { authorize } = require('../middlewares/authMiddleware');
const { checkPermissions } = require('../middlewares/permissionMiddleware');
const Roles = require('../constants/rolesConstants');

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

module.exports = router;
