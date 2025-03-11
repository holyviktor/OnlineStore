import * as productsAccessor from '../accessors/productsAccessor';
import * as categoriesService from './categoriesService';
import { newValidationError } from '../utils/validationErrorUtil';
import { CustomError } from '../handlers/customError';
import { IProduct } from '../models/productModel';
import { IValidation } from '../models/validationModel';
import { ProductQuery } from '../models/productQueryModel';
import { IProductFilter} from '../models/filterModel';
import { ISortOption } from '../models/sortModel';

const requiredProperties = [
    'categoryId',
    'name',
    'price',
    'photo',
    'description',
];

async function getProducts(productQuery: ProductQuery | undefined): Promise<IProduct[]> {
    const filter: IProductFilter = {};
    let sortOption: ISortOption = {};
    if (productQuery){
        if (productQuery.search) {
            filter.name = { $regex: productQuery.search, $options: "i" };
        }
        if (productQuery.priceFrom !== undefined) {
            filter.price = { ...filter.price, $gte: productQuery.priceFrom };
        }
        if (productQuery.priceTo !== undefined) {
            filter.price = { ...filter.price, $lte: productQuery.priceTo };
        }
        if (productQuery.sort)
            sortOption = { price: productQuery.sort === "asc" ? 1 : -1 };
    }

    return await productsAccessor.getProducts(filter, sortOption);
}

async function getProductById(productId: string): Promise<IProduct> {
    let product = await productsAccessor.getProductById(productId);
    if (!product) throw new CustomError(404, 'No product with such id!');
    return product;
}

async function getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    if (!(await categoriesService.checkIfCategoryExists(categoryId))) {
        throw new CustomError(400, 'Unknown product category!');
    }
    return productsAccessor.getByCategory(categoryId);
}

async function addProduct(product: Omit<IProduct, 'id'>) {
    const validation = checkProduct(product, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await productsAccessor.addProduct(product);
}

async function editProduct(
    productId: string,
    productData: Partial<IProduct>,
): Promise<IProduct | null> {
    if (!(await checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    const validation = checkProduct(productData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    return await productsAccessor.editProduct(productId, productData);
}

async function deleteProduct(productId: string): Promise<string> {
    if (!(await checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    return await productsAccessor.deleteProduct(productId);
}

function checkProduct(
    product: Partial<IProduct>,
    isAllRequired: boolean,
): IValidation {
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
        (!product.categoryId ||
            !categoriesService.checkIfCategoryExists(product.categoryId))
    ) {
        return newValidationError(400, 'Unknown product category!');
    }
    if (product.hasOwnProperty('name') && !product.name) {
        return newValidationError(400, 'Name is empty!');
    }
    if (
        product.hasOwnProperty('price') &&
        (!product.price || product.price <= 0)
    ) {
        return newValidationError(400, 'Price must be more than 0!');
    }
    return {
        status: 200,
        message: '',
        isValid: true,
    };
}

async function checkIfProductExists(productId: string): Promise<boolean> {
    let product = await productsAccessor.getProductById(productId);
    return !!product;
}

export {
    getProducts,
    getProductsByCategory,
    addProduct,
    editProduct,
    deleteProduct,
    getProductById,
    checkIfProductExists,
};
