import { ICart } from './cartModel';

interface IUser {
    role: string;
    login: string;
    password: string;
    email: string;
    phoneNumber: string;
    cart: ICart[];
    orders: string[];
}

export { IUser };
