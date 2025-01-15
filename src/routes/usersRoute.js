const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

const ROUTES = {
    GET: '/',
    GET_BY_LOGIN: '/:userLogin',
    CREATE: '/create',
    EDIT: '/edit/:userLogin',
    DELETE: '/delete/:userLogin',
}

router.get(ROUTES.GET, usersController.getUsers);

router.get(ROUTES.GET_BY_LOGIN, usersController.getUserByLogin);

router.post(ROUTES.CREATE, usersController.createUser);

router.put(ROUTES.EDIT, usersController.editUser);

router.delete(ROUTES.DELETE, usersController.deleteUser);

module.exports = router;