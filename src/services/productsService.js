const productsAccessor = require('../accessors/productsAccessor');
const categoriesService = require('../services/categoriesService');
const newValidationError = require('../utils/validationErrorUtil');
const CustomError = require('../handlers/customError');

const requiredProperties = [
    'categoryId',
    'name',
    'price',
    'photo',
    'description',
];

async function getProducts() {
    return await productsAccessor.getProducts();
}

async function getProductById(productId) {
    let product = await productsAccessor.getProductById(productId);
    if (!product) throw new CustomError(404, 'No product with such id!');
    return product;
}

async function getProductsByCategory(categoryId) {
    if (!(await categoriesService.checkIfCategoryExists(categoryId))) {
        throw new CustomError(400, 'Unknown product category!');
    }
    return productsAccessor.getByCategory(categoryId);
}

async function addProduct(product) {
    const validation = checkProduct(product, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await productsAccessor.addProduct(product);
}

async function editProduct(productId, productData) {
    if (!(await checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    const validation = checkProduct(productData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await productsAccessor.editProduct(productId, productData);
}

async function deleteProduct(productId) {
    if (!(await checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    return await productsAccessor.deleteProduct(productId);
}

function checkProduct(product, isAllRequired) {
    let isLengthCorrect = isAllRequired
        ? Object.keys(product).length === requiredProperties.length
        : Object.keys(product).length > 0;
    let isPropertiesCorrect = Object.keys(product).every(key =>
        requiredProperties.includes(key),
    );
    let isFormatCorrect = isLengthCorrect && isPropertiesCorrect;
    if (!isFormatCorrect) {
        return newValidationError(400, 'Product format is not correct!');
    }

    if (
        product.hasOwnProperty('categoryId') &&
        !categoriesService.checkIfCategoryExists(product.categoryId)
    ) {
        return newValidationError(400, 'Unknown product category!');
    }
    if (product.hasOwnProperty('name') && !product.name) {
        return newValidationError(400, 'Name is empty!');
    }
    if (product.hasOwnProperty('price') && product.price <= 0) {
        return newValidationError(400, 'Price must be more than 0!');
    }
    return {
        status: 200,
        message: '',
        isValid: true,
    };
}

async function checkIfProductExists(productId) {
    let product = await productsAccessor.getProductById(productId);
    return !!product;
}

module.exports = {
    getProducts,
    getProductsByCategory,
    addProduct,
    editProduct,
    deleteProduct,
    getProductById,
    checkIfProductExists,
};
