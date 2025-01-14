const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

const ROUTES = {
    GET: '/',
    GET_BY_ID: '/:categoryId',
    DELETE: '/delete',
    ADD: '/add',
    EDIT: '/edit'
}

router.get(ROUTES.GET, categoriesController.getCategories);

router.get(ROUTES.GET_BY_ID, categoriesController.getCategoryById);

router.post(ROUTES.ADD, categoriesController.addCategory);

router.put(ROUTES.EDIT, categoriesController.editCategory);

router.delete(ROUTES.DELETE, categoriesController.deleteCategory);

module.exports = router;