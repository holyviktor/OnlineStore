import * as fileUtil from '../utils/fileUtil';
import * as storageConfig from '../configs/storageConfig';
import { getUserByLogin, getUsers } from './usersAccessor';
import { IUser } from '../models/userModel';
import { ICart } from '../models/cartModel';
const usersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.USERS}`;

async function getCartByUserLogin(userLogin: string): Promise<ICart[] | null> {
    let user: IUser = await getUserByLogin(userLogin);
    return user?.cart || null;
}

async function addToCart(
    userLogin: string,
    productId: string,
    count: number,
): Promise<string> {
    let users: IUser[] = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            const updatedCart = [...user.cart];

            const existingProduct = updatedCart.find(
                obj => obj.productId === productId,
            );

            if (existingProduct) {
                existingProduct.count += count;
            } else {
                updatedCart.push({ productId: productId, count: count });
            }
            return { ...user, cart: updatedCart };
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

async function subtractFromCart(
    userLogin: string,
    productId: string,
): Promise<string> {
    let users: IUser[] = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedCart = [...user.cart];

            const existingProduct = updatedCart.find(
                obj => obj.productId === productId,
            );
            if (existingProduct && existingProduct.count > 1) {
                existingProduct.count -= 1;
            } else if (existingProduct) {
                updatedCart = updatedCart.filter(
                    obj => obj.productId !== productId,
                );
            }

            return { ...user, cart: updatedCart };
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

async function setToCart(
    userLogin: string,
    productId: string,
    count: number,
): Promise<string> {
    let users: IUser[] = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedCart = [...user.cart];

            const existingProduct = updatedCart.find(
                obj => obj.productId === productId,
            );

            if (existingProduct && count === 0) {
                updatedCart = updatedCart.filter(
                    obj => obj.productId !== productId,
                );
            } else if (existingProduct) {
                existingProduct.count = count;
            } else {
                updatedCart.push({ productId: productId, count: count });
            }
            return { ...user, cart: updatedCart };
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

async function clearFromCart(
    userLogin: string,
    productId: string,
): Promise<string> {
    let users: IUser[] = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedCart = [...user.cart];
            updatedCart = updatedCart.filter(
                obj => obj.productId !== productId,
            );
            return { ...user, cart: updatedCart };
        }
        return user;
    });
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

export {
    getCartByUserLogin,
    addToCart,
    clearFromCart,
    subtractFromCart,
    setToCart,
};
