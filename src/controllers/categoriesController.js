const categoriesService = require('../services/categoriesService');

async function getCategories(req, res, next) {
    try {
        res.json(await categoriesService.getCategories());
    } catch (err) {
        next(err);
    }
}

async function getCategoryById(req, res, next) {
    try {
        res.json(
            await categoriesService.getCategoryById(req.params.categoryId),
        );
    } catch (err) {
        next(err);
    }
}

async function addCategory(req, res, next) {
    try {
        res.json(await categoriesService.addCategory(req.body));
    } catch (err) {
        next(err);
    }
}

async function editCategory(req, res, next) {
    try {
        res.json(
            await categoriesService.editCategory(
                req.params.categoryId,
                req.body,
            ),
        );
    } catch (err) {
        next(err);
    }
}

async function deleteCategory(req, res, next) {
    try {
        res.json(await categoriesService.deleteCategory(req.params.categoryId));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
};
