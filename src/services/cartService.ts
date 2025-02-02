import * as cartAccessor from '../accessors/cartAccessor';
import { checkIfUserExists } from './usersService';
import * as productService from './productsService';
import { CustomError } from '../handlers/customError';
import { ICart } from '../models/cartModel';

async function getCartByLogin(userLogin: string): Promise<ICart[] | null> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    return cartAccessor.getCartByUserLogin(userLogin);
}

async function addToCart(
    userLogin: string,
    productId: string,
    count: number,
): Promise<string> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    if (!(await productService.checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    if (count <= 0) {
        throw new CustomError(400, 'Count to add must be more than 0');
    }
    return cartAccessor.addToCart(userLogin, productId, count);
}

async function clearFromCart(
    userLogin: string,
    productId: string,
): Promise<string> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    if (!(await productService.checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    if (!(await checkIfProductInCart(userLogin, productId))) {
        throw new CustomError(400, "User don't have this product in cart");
    }
    return cartAccessor.clearFromCart(userLogin, productId);
}

async function subtractFromCart(
    userLogin: string,
    productId: string,
): Promise<string> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    if (!(await productService.checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    if (!(await checkIfProductInCart(userLogin, productId))) {
        throw new CustomError(400, "User don't have this product in cart");
    }
    return cartAccessor.subtractFromCart(userLogin, productId);
}

async function setToCart(
    userLogin: string,
    productId: string,
    count: number,
): Promise<string> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    if (!(await productService.checkIfProductExists(productId))) {
        throw new CustomError(404, "Product doesn't exists");
    }
    if (count < 0) {
        throw new CustomError(400, 'Count to add must be more or equal to 0');
    }
    return cartAccessor.setToCart(userLogin, productId, count);
}

async function checkIfProductInCart(
    userLogin: string,
    productId: string,
): Promise<boolean> {
    let userCart: ICart[] | null =
        await cartAccessor.getCartByUserLogin(userLogin);
    return !!userCart?.find(obj => obj.productId === productId);
}

export {
    getCartByLogin,
    addToCart,
    setToCart,
    clearFromCart,
    subtractFromCart,
};
