import * as express from 'express';
import * as categoriesController from '../controllers/categoriesController';
import { ROUTES } from '../constants/categoriesConstants';
import { authorize } from '../middlewares/authMiddleware';
import { Roles } from '../constants/rolesConstants';

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

export { router };
