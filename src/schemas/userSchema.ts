import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            count: { type: Number, required: true, min: 1 },
        },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

const User = model('User', UserSchema);

export default User;
