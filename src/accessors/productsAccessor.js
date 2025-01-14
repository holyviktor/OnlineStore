const fileService = require('./fileAccessor');
const storageConfig = require('../configs/storageConfig');
const productStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.PRODUCTS}`;
const keyWord = 'products';

async function getProducts(){
    let productsContent = await fileService.readFile(productStorage);
    return JSON.parse(productsContent)[keyWord];
}

async function writeProducts(products){
    await fileService.writeFile(productStorage, JSON.stringify({[keyWord]:products}));
}

async function addProduct(product){
    let products = await getProducts();
    let createdProduct = {id:Date.now().toString(), ...product};
    products.push(createdProduct);
    await writeProducts(products);
    return product;
}

async function getProductById(productId){
    let products = await getProducts();
    return products.find((product) => product.id === productId) || null;
}

async function editProduct(productId, productData){
    let products = await getProducts();
    let changedProduct;
    products = products.map(product => {
        if (product.id === productId) {
            let newProduct = {
                ...product,
                ...productData
            };
            changedProduct = newProduct;
            return newProduct;
        }
        return product;
    })
    await writeProducts(products);
    return changedProduct;
}

async function deleteProduct(productId) {
    let products = await getProducts();
    products = products.filter(product => product.id !== productId);
    await writeProducts(products);
    return products;
}


module.exports = {getProducts, addProduct, editProduct, deleteProduct, getProductById};