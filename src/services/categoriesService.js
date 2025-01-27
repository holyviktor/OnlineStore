const categoriesAccessor = require('../accessors/categoriesAccessor');
const newValidationError = require('../utils/validationErrorUtil');
const CustomError = require('../handlers/customError');

const requiredProperties = ['name'];

async function getCategories() {
    return categoriesAccessor.getCategories();
}

async function getCategoryById(categoryId) {
    let category = await categoriesAccessor.getCategoryById(categoryId);
    if (!category) {
        throw new CustomError(404, 'No category with such id!');
    }
    return category;
}

async function addCategory(category) {
    let validation = checkCategory(category, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return categoriesAccessor.addCategory(category);
}

async function editCategory(categoryId, categoryData) {
    if (!(await checkIfCategoryExists(categoryId))) {
        throw new CustomError(404, "Category doesn't exists");
    }
    let validation = checkCategory(categoryData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await categoriesAccessor.editCategory(categoryId, categoryData);
}

async function deleteCategory(categoryId) {
    if (!(await checkIfCategoryExists(categoryId))) {
        throw new CustomError(404, "Category doesn't exists");
    }
    return await categoriesAccessor.deleteCategory(categoryId);
}

async function checkIfCategoryExists(categoryId) {
    let category = await categoriesAccessor.getCategoryById(categoryId);
    return !!category;
}

function checkCategory(category, isAllRequired) {
    let isLengthCorrect = isAllRequired
        ? Object.keys(category).length === requiredProperties.length
        : Object.keys(category).length > 0;
    let isPropertiesCorrect = Object.keys(category).every(key =>
        requiredProperties.includes(key),
    );
    let isFormatCorrect = isLengthCorrect && isPropertiesCorrect;
    if (!isFormatCorrect) {
        return newValidationError(400, 'Category format is not correct!');
    }
    if (category.hasOwnProperty('name') && category.name) {
        return newValidationError(400, 'Category must have name!');
    }
    return {
        status: 200,
        message: '',
        isValid: true,
    };
}

module.exports = {
    getCategories,
    getCategoryById,
    checkIfCategoryExists,
    addCategory,
    editCategory,
    deleteCategory,
};
