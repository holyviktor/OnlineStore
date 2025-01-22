const express = require('express');
const cartController = require('../controllers/cartController');
const {ROUTES} = require('../constants/cartConstants')
const {authorize, Roles} = require("../middlewares/authMiddleware");
const {checkPermissions} = require("../middlewares/permissionMiddleware");

const router = express.Router();

router.get(ROUTES.GET, authorize(Roles.All), checkPermissions, cartController.getByLogin);
router.post(ROUTES.ADD,authorize(Roles.All), checkPermissions, cartController.add);
router.put(ROUTES.SET, authorize(Roles.All), checkPermissions, cartController.set);
router.delete(ROUTES.CLEAR, authorize(Roles.All), checkPermissions, cartController.clear);
router.put(ROUTES.SUBTRACT, authorize(Roles.All), checkPermissions, cartController.subtract);

module.exports = router;