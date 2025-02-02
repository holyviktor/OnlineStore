import { v4 as uuidv4 } from 'uuid';

import fileUtil = require('../utils/fileUtil');
import storageConfig = require('../configs/storageConfig');
import { IProduct } from '../models/productModel';

const productStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.PRODUCTS}`;

async function getProducts(): Promise<IProduct[]> {
    return fileUtil.readFile(productStorage);
}

async function addProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    let products: IProduct[] = await getProducts();
    let createdProduct: IProduct = { id: uuidv4(), ...product };
    products.push(createdProduct);
    await fileUtil.writeFile(productStorage, products);
    return createdProduct;
}

async function getProductById(productId: string): Promise<IProduct | null> {
    let products: IProduct[] = await getProducts();
    return products.find(product => product.id === productId) || null;
}

async function getByCategory(categoryId: string): Promise<IProduct[]> {
    let products: IProduct[] = await getProducts();
    return products?.filter(product => product.categoryId === categoryId);
}

async function editProduct(
    productId: string,
    productData: Partial<IProduct>,
): Promise<IProduct | undefined> {
    let products: IProduct[] = await getProducts();
    let changedProduct: IProduct | undefined;
    products = products.map(product => {
        if (product.id === productId) {
            let newProduct = {
                ...product,
                ...productData,
            };
            changedProduct = newProduct;
            return newProduct;
        }
        return product;
    });
    await fileUtil.writeFile(productStorage, products);
    return changedProduct;
}

async function deleteProduct(productId: string): Promise<string> {
    let products: IProduct[] = await getProducts();
    products = products.filter(product => product.id !== productId);
    await fileUtil.writeFile(productStorage, products);
    return productId;
}

export {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getProductById,
    getByCategory,
};
