const categoriesAccessor = require('../accessors/categoriesAccessor');
const newValidationError = require('../utils/validationErrorUtil');
const CustomError = require('../handlers/customError');

const requiredProperties = ['name'];

async function get(){
    return await categoriesAccessor.getCategories();
}

async function getById(categoryId){
    let category = await categoriesAccessor.getCategoryById(categoryId);
    if (!category) throw new CustomError(404,"No category with such id!")
    return category;
}


async function add(category){
    let validation = checkCategory(category, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await categoriesAccessor.addCategory(category);
}

async function edit(categoryId, categoryData){
    if (!await checkIfCategoryExists(categoryId)){
        throw new CustomError(404,"Category doesn't exists");
    }
    let validation = checkCategory(categoryData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await categoriesAccessor.editCategory(categoryId, categoryData)
}

async function del(categoryId){
    if (!await checkIfCategoryExists(categoryId)){
        throw new CustomError(404,"Category doesn't exists");
    }
    return await categoriesAccessor.deleteCategory(categoryId);
}

async function checkIfCategoryExists(categoryId) {
    let categories = await categoriesAccessor.getCategories();
    return categories.some(category => category.id === categoryId);
}

function checkCategory(category, isAllRequired){
    let validation = {
        status: 200,
        message: "",
        isValid: true
    }

    let isFormatCorrect = (isAllRequired ? Object.keys(category).length === requiredProperties.length :
            Object.keys(category).length > 0) && Object.keys(category).every((key) => requiredProperties.includes(key));
    if (!isFormatCorrect){
        return newValidationError(validation, 400, "Category format is not correct!");
    }
    if (category.hasOwnProperty('name') && category.name){
        return newValidationError(validation, 400, "Category must have name!");
    }
    return validation;
}

module.exports = {get, getById, checkIfCategoryExists, add, edit, del}