const express = require('express');
const usersController = require('../controllers/usersController');
const cartRouter = require('./cartRoute');
const {ROUTES} = require('../constants/usersConstants');

const router = express.Router();

router.use(ROUTES.CART, cartRouter);

router.get(ROUTES.GET, usersController.getUsers);

router.get(ROUTES.GET_BY_LOGIN, usersController.getUserByLogin);

router.post(ROUTES.CREATE, usersController.createUser);

router.put(ROUTES.EDIT, usersController.editUser);

router.delete(ROUTES.DELETE, usersController.deleteUser);

module.exports = router;