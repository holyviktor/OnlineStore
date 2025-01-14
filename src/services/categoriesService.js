const categoriesAccessor = require('../accessors/categoriesAccessor');
const requiredProperties = ['name'];

async function get(){
    return await categoriesAccessor.getCategories();
}

async function getById(categoryId){
    let category = await categoriesAccessor.getCategoryById(categoryId);
    if (!category) throw new Error("No category with such id!")
    return category;
}


async function add(category){
    checkCategory(category);
    return await categoriesAccessor.addCategory(category);
}

async function edit(categoryId, categoryData){
    if (!await checkIfCategoryExists(categoryId)){
        throw new Error("Category doesn't exists");
    }
    checkCategory(categoryData);
    return await categoriesAccessor.editCategory(categoryId, categoryData)
}

async function del(categoryId){
    if (!await checkIfCategoryExists(categoryId)){
        throw new Error("Category doesn't exists");
    }
    return await categoriesAccessor.deleteCategory(categoryId);
}

async function checkIfCategoryExists(categoryId) {
    let categories = await categoriesAccessor.getCategories();
    return categories.some(category => category.id === categoryId);
}

function checkCategory(category){
    let isFormatCorrect = Object.keys(category).length === requiredProperties.length &&
    requiredProperties.every((key) => category.hasOwnProperty(key));
    if (!isFormatCorrect){
        throw new Error("Category format is not correct!");
    }
    if (!category.name){
        throw new Error("Category must have name!");
    }
}

module.exports = {get, getById, checkIfCategoryExists, add, edit, del}