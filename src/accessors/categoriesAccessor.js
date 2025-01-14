const fileService = require('./fileAccessor');
const storageConfig = require('../configs/storageConfig');
const categoriesStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.CATEGORIES}`;
const keyWord = 'categories';

async function getCategories(){
    let categoriesContent = await fileService.readFile(categoriesStorage);
    return JSON.parse(categoriesContent)[keyWord];
}

async function writeCategories(categories){
    await fileService.writeFile(categoriesStorage, JSON.stringify({[keyWord]:categories}));
}

async function getCategoryById(categoryId){
    let categories = await getCategories();
    return categories.find((category) => category.id === categoryId) || null;
}

async function addCategory(category){
    let categories = await getCategories();
    let createdCategory = {id:Date.now().toString(), ...category};
    categories.push(createdCategory);
    await writeCategories(categories);
    return createdCategory;
}

async function editCategory(categoryId, categoryData){
    let categories = await getCategories();
    let changedCategory;
    categories = categories.map(category => {
        if (category.id === categoryId) {
            let newCategory = {
                ...category,
                ...categoryData
            };
            changedCategory = newCategory;
            return newCategory;
        }
        return category;
    })
    await writeCategories(categories);
    return changedCategory;
}

async function deleteCategory(categoryId) {
    let categories = await getCategories();
    categories = categories.filter(category => category.id !== categoryId);
    await writeCategories(categories);
    return categories;
}

module.exports = {getCategories, getCategoryById, addCategory, editCategory, deleteCategory}