const productsAccessor = require('../accessors/productsAccessor');
const categoriesService = require('../services/categoriesService');
const newValidationError = require('../utils/validationErrorUtil');
const CustomError = require('../handlers/customError');

const requiredProperties = ["categoryId", "name", "price", "photo", "description"];

async function get(){
    return await productsAccessor.getProducts();
}

async function getById(productId){
    let product = await productsAccessor.getProductById(productId);
    if (!product) throw new CustomError(404, "No product with such id!")
    return product;
}

async function getByCategory(categoryId){
    let products = await productsAccessor.getProducts();
    return products?.filter(product => product.categoryId === categoryId);
}

async function add(product){
    const validation = checkProduct(product, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await productsAccessor.addProduct(product);
}

async function edit(productId, productData){
    if (!await checkIfProductExists(productId)){
        throw new CustomError(404,"Product doesn't exists");
    }
    const validation = checkProduct(productData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await productsAccessor.editProduct(productId, productData)
}

async function del(productId){
    if (!await checkIfProductExists(productId)){
        throw new CustomError(404,"Product doesn't exists");
    }
    return await productsAccessor.deleteProduct(productId);
}

function checkProduct(product, isAllRequired){
    let validation = {
        status:200,
        message: "",
        isValid: true
    }

    let isFormatCorrect = (isAllRequired ? Object.keys(product).length === requiredProperties.length :
        Object.keys(product).length > 0) && Object.keys(product).every((key) => requiredProperties.includes(key));
    if (!isFormatCorrect){
        return newValidationError(validation, 400, "Product format is not correct!");
    }

    if (product.hasOwnProperty('categoryId') && !categoriesService.checkIfCategoryExists(product.categoryId)){
        return newValidationError(validation, 400, "Unknown product category!");
    }
    if (product.hasOwnProperty('name') && !product.name){
        return newValidationError(validation, 400, "Name is empty!");
    }
    if (product.hasOwnProperty('price') && product.price<=0){
        return newValidationError(validation, 400, "Price must be more than 0!");
    }

    return validation;
}

async function checkIfProductExists(productId) {
    let products = await productsAccessor.getProducts();
    return products.some(product=>product.id === productId);
}


module.exports = {get, getByCategory, add, edit, del, getById, checkIfProductExists};