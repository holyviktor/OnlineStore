const express = require('express');
const usersController = require('../controllers/usersController');
const {ROUTES} = require('../constants/usersConstants');
const {authorize, Roles} = require("../middlewares/authMiddleware");
const {checkPermissions} = require("../middlewares/permissionMiddleware");

const router = express.Router();

router.get(ROUTES.GET, authorize(Roles.Admin), usersController.getUsers);

router.get(ROUTES.LOGIN, usersController.loginUser);

router.get(ROUTES.GET_BY_LOGIN, authorize(Roles.All), checkPermissions, usersController.getUserByLogin);

router.post(ROUTES.REGISTER, usersController.createUser);

router.put(ROUTES.EDIT, authorize(Roles.All), checkPermissions, usersController.editUser);

router.delete(ROUTES.DELETE, authorize(Roles.All), checkPermissions, usersController.deleteUser);

module.exports = router;