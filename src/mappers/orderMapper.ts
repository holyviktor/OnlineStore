import { Document } from 'mongoose';
import { IOrder } from '../models/orderModel';

const mapOrder = (
    order: Document & {
        products: { productId: { toString: () => string }; count: number }[];
        cost: number;
        date: Date;
    },
): IOrder => ({
    id: order.get('_id').toString(),
    date: order.date.toISOString(),
    products: order.products.map(item => ({
        productId: item.productId.toString(),
        count: item.count,
    })),
    cost: order.cost,
});

export default mapOrder;
