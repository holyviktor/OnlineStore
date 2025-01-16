const fileUtil = require('../utils/fileUtil');
const storageConfig = require('../configs/storageConfig');
const categoriesStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.CATEGORIES}`;

async function getCategories(){
    return fileUtil.readFile(categoriesStorage);
}

async function getCategoryById(categoryId){
    let categories = await getCategories();
    return categories.find((category) => category.id === categoryId) || null;
}

async function addCategory(category){
    let categories = await getCategories();
    let createdCategory = {id:Date.now().toString(), ...category};
    categories.push(createdCategory);
    await fileUtil.writeFile(categoriesStorage, categories);
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
    await fileUtil.writeFile(categoriesStorage, categories);
    return changedCategory;
}

async function deleteCategory(categoryId) {
    let categories = await getCategories();
    categories = categories.filter(category => category.id !== categoryId);
    await fileUtil.writeFile(categoriesStorage, categories);
    return categoryId;
}

module.exports = {getCategories, getCategoryById, addCategory, editCategory, deleteCategory}