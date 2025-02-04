import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
