import { Document } from 'mongoose';
import { ICategory } from '../models/categoryModel';

const mapCategory = (category: Document & { name: string }): ICategory => ({
    id: category.get('_id').toString(),
    name: category.get('name'),
});

export default mapCategory;
