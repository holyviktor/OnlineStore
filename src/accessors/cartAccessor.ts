import { ICart } from '../models/cartModel';
import User from '../schemas/userSchema';
import mongoose from 'mongoose';
import { CustomError } from '../handlers/customError';

async function getCartByUserLogin(userLogin: string): Promise<ICart[] | null> {
    const user = await User.findOne({ login: userLogin });
    return user
        ? user.cart.map(({ productId, count }) => ({
              productId: productId.toString(),
              count,
          }))
        : null;
}

async function addToCart(
    userLogin: string,
    productId: string,
    count: number,
): Promise<string> {
    const user = await User.findOne({ login: userLogin });
    if (!user) throw new CustomError(404, 'User not found');

    const cartItem = user.cart.find(item =>
        item.productId.equals(new mongoose.Types.ObjectId(productId)),
    );

    if (cartItem) {
        cartItem.count += count;
    } else {
        user.cart.push({
            productId: new mongoose.Types.ObjectId(productId),
            count: count,
        });
    }

    await user.save();
    return productId;
}

async function subtractFromCart(
    userLogin: string,
    productId: string,
): Promise<string> {
    let user = await User.findOne({ login: userLogin });
    if (!user) throw new CustomError(404, 'User not found');
    const cartItem = user.cart.find(item =>
        item.productId.equals(new mongoose.Types.ObjectId(productId)),
    );
    if (!cartItem) {
        throw new CustomError(404, 'Product not in cart');
    }
    if (cartItem.count > 1) {
        cartItem.count -= 1;
    } else {
        user.cart = user.cart.pull(cartItem._id);
    }

    await user.save();
    return productId;
}

async function setToCart(
    userLogin: string,
    productId: string,
    count: number,
): Promise<string> {
    let user = await User.findOne({ login: userLogin });
    if (!user) throw new CustomError(404, 'User not found');
    const cartItem = user.cart.find(item =>
        item.productId.equals(new mongoose.Types.ObjectId(productId)),
    );
    if (!cartItem) {
        user.cart.push({
            productId: new mongoose.Types.ObjectId(productId),
            count: count,
        });
    } else if (count === 0) {
        user.cart = user.cart.pull(cartItem._id);
    } else {
        cartItem.count = count;
    }

    await user.save();
    return productId;
}

async function clearFromCart(
    userLogin: string,
    productId: string,
): Promise<string> {
    let user = await User.findOne({ login: userLogin });
    if (!user) throw new CustomError(404, 'User not found');

    const cartItem = user.cart.find(item =>
        item.productId.equals(new mongoose.Types.ObjectId(productId)),
    );
    if (cartItem) {
        user.cart = user.cart.pull(cartItem._id);
        console.log(user.cart);
    }

    await user.save();
    return productId;
}

export {
    getCartByUserLogin,
    addToCart,
    clearFromCart,
    subtractFromCart,
    setToCart,
};
