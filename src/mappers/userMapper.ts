import { Document, Types } from 'mongoose';
import { IUser } from '../models/userModel';

const mapUser = (
    user: Document & { cart: any[]; orders: (Types.ObjectId | string)[] },
): IUser => ({
    login: user.get('login'),
    role: user.get('role'),
    password: user.get('password'),
    email: user.get('email'),
    phoneNumber: user.get('phoneNumber'),
    cart: user.cart.map(item => ({
        ...item.toObject(),
        productId: item.productId.toString(),
    })),
    orders: user.orders.map(orderId => orderId.toString()), // Convert ObjectId array to string array
});

export default mapUser;
