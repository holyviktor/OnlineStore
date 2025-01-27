const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { ROUTES } = require('../constants/categoriesConstants');
const { authorize } = require('../middlewares/authMiddleware');
const Roles = require('../constants/rolesConstants');

const router = express.Router();

router.get(ROUTES.GET, categoriesController.getCategories);
router.get(ROUTES.GET_BY_ID, categoriesController.getCategoryById);

router.post(
    ROUTES.ADD,
    authorize(Roles.Admin),
    categoriesController.addCategory,
);

router.put(
    ROUTES.EDIT,
    authorize(Roles.Admin),
    categoriesController.editCategory,
);

router.delete(
    ROUTES.DELETE,
    authorize(Roles.Admin),
    categoriesController.deleteCategory,
);

module.exports = router;
