import { Document } from 'mongoose';
import { IProduct } from '../models/productModel';

const mapProduct = (
    product: Document & { categoryId: { toString: () => string } },
): IProduct => ({
    id: product.get('_id').toString(),
    categoryId: product.categoryId.toString(),
    name: product.get('name'),
    price: product.get('price'),
    photo: product.get('photo'),
    description: product.get('description'),
});

export default mapProduct;
