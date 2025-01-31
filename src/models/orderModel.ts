import { ICart } from './cartModel';

interface IOrder {
    id: string;
    date: string;
    products: ICart[];
    cost: number;
}

export { IOrder };
