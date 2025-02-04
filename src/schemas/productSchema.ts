import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
    price: { type: Number, required: true, min: 1 },
    photo: { type: String, required: true, default: '' },
    description: {
        type: String,
        required: true,
        default: 'No description available',
    },
});

ProductSchema.virtual('id').get(function () {
    return this._id.toString();
});

const Product = model('Product', ProductSchema);

export default Product;
