import { IProduct } from '../models/productModel';
import Product from '../schemas/productSchema';
import mapProduct from '../mappers/productMapper';
import { IProductFilter } from '../models/filterModel';
import { ISortOption } from '../models/sortModel';

async function getProducts(filter: IProductFilter, sortOption: ISortOption): Promise<IProduct[]> {
    let products = await Product.find(filter).sort(sortOption);
    return products.map(product => mapProduct(product));
}

async function addProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    let createdProduct = new Product(product);
    await createdProduct.save();
    return mapProduct(createdProduct);
}

async function getProductById(productId: string): Promise<IProduct | null> {
    let product = await Product.findById(productId);
    return product ? mapProduct(product) : null;
}

async function getByCategory(categoryId: string): Promise<IProduct[]> {
    let products = await Product.where('categoryId').equals(categoryId);
    return products.map(product => mapProduct(product));
}

async function editProduct(
    productId: string,
    productData: Partial<IProduct>,
): Promise<IProduct | null> {
    await Product.updateOne({ _id: productId }, { $set: productData });
    return getProductById(productId);
}

async function deleteProduct(productId: string): Promise<string> {
    await Product.deleteOne({ _id: productId });
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
