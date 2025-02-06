import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            count: { type: Number, required: true, min: 1 },
        },
    ],
    cost: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: Date.now() },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
