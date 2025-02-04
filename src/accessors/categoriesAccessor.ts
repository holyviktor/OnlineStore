import { ICategory } from '../models/categoryModel';
import Category from '../schemas/categorySchema';
import mapCategory from '../mappers/categoryMapper';

async function getCategories(): Promise<ICategory[]> {
    let categories = await Category.find();
    return categories.map(category => mapCategory(category));
}

async function getCategoryById(categoryId: string): Promise<ICategory | null> {
    let category = await Category.findById(categoryId);
    return category ? mapCategory(category) : null;
}

async function addCategory(
    category: Omit<ICategory, 'id'>,
): Promise<ICategory> {
    let createdCategory = new Category(category);
    await createdCategory.save();
    return mapCategory(createdCategory);
}

async function editCategory(
    categoryId: string,
    categoryData: Omit<ICategory, 'id'>,
): Promise<ICategory | null> {
    await Category.updateOne({ _id: categoryId }, { $set: categoryData });
    return getCategoryById(categoryId);
}

async function deleteCategory(categoryId: string): Promise<string> {
    await Category.deleteOne({ _id: categoryId });
    return categoryId;
}

export {
    getCategories,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
};
