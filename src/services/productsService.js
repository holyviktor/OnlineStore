const productsAccessor = require('../accessors/productsAccessor');
const categoriesService = require('../services/categoriesService');

const requiredProperties = ["categoryId", "name", "price", "photo", "description"];

async function get(){
    return await productsAccessor.getProducts();
}

async function getById(productId){
    let product = await productsAccessor.getProductById(productId);
    if (!product) throw new Error("No product with such id!")
    return product;
}

async function getByCategory(categoryId){
    let products = await productsAccessor.getProducts();
    console.log(products)
    return products?.filter(product => product.categoryId === categoryId);
}

async function add(product){
    checkProduct(product);
    return await productsAccessor.addProduct(product);
}

async function edit(productId, productData){
    if (!await checkIfProductExists(productId)){
        throw new Error("Product doesn't exists");
    }
    checkProduct(productData);
    return await productsAccessor.editProduct(productId, productData)
}

async function del(productId){
    if (!await checkIfProductExists(productId)){
        throw new Error("Product doesn't exists");
    }
    return await productsAccessor.deleteProduct(productId);
}

function checkProduct(product){
    let isFormatCorrect = Object.keys(product).length === requiredProperties.length &&
        requiredProperties.every((key) => product.hasOwnProperty(key));
    if (!isFormatCorrect){
        throw new Error("Product format is not correct!");
    }
    if (!categoriesService.checkIfCategoryExists(product.categoryId)){
        throw new Error("Unknown product category!");
    }
    if (!product.name){
        throw new Error("Name is empty!");
    }
    if (product.price<=0){
        throw new Error("Price must be more than 0!");
    }
}

async function checkIfProductExists(productId) {
    let products = await productsAccessor.getProducts();
    return products.some(product=>product.id === productId);
}


module.exports = {get, getByCategory, add, edit, del, getById};