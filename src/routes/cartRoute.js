const express = require('express');
const cartController = require('../controllers/cartController');
const {ROUTES} = require('../constants/cartConstants')

const router = express.Router();

router.get(ROUTES.GET, cartController.getByLogin);
router.post(ROUTES.ADD, cartController.add);
router.put(ROUTES.SET, cartController.set);
router.delete(ROUTES.CLEAR, cartController.clear);
router.put(ROUTES.SUBTRACT, cartController.subtract);

module.exports = router;