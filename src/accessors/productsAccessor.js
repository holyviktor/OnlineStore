const fileUtil = require('../utils/fileUtil');
const storageConfig = require('../configs/storageConfig');

const productStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.PRODUCTS}`;

async function getProducts(){
    return fileUtil.readFile(productStorage);
}

async function addProduct(product){
    let products = await getProducts();
    let createdProduct = {id:Date.now().toString(), ...product};
    products.push(createdProduct);
    await fileUtil.writeFile(productStorage, products)
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
    await fileUtil.writeFile(productStorage, products)
    return changedProduct;
}

async function deleteProduct(productId) {
    let products = await getProducts();
    products = products.filter(product => product.id !== productId);
    await fileUtil.writeFile(productStorage, products)
    return productId;
}


module.exports = {getProducts, addProduct, editProduct, deleteProduct, getProductById};