import { v4 as uuidv4 } from 'uuid';
import * as fileUtil from '../utils/fileUtil';
import * as storageConfig from '../configs/storageConfig';
import { ICategory } from '../models/categoryModel';
const categoriesStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.CATEGORIES}`;

async function getCategories(): Promise<ICategory[]> {
    return fileUtil.readFile(categoriesStorage);
}

async function getCategoryById(categoryId: string): Promise<ICategory | null> {
    let categories: ICategory[] = await getCategories();
    return categories.find(category => category.id === categoryId) || null;
}

async function addCategory(
    category: Omit<ICategory, 'id'>,
): Promise<ICategory> {
    let categories: ICategory[] = await getCategories();
    let createdCategory: ICategory = { id: uuidv4(), ...category };
    categories.push(createdCategory);
    await fileUtil.writeFile(categoriesStorage, categories);
    return createdCategory;
}

async function editCategory(
    categoryId: string,
    categoryData: Omit<ICategory, 'id'>,
): Promise<ICategory | undefined> {
    let categories: ICategory[] = await getCategories();
    let changedCategory: ICategory | undefined;
    categories = categories.map(category => {
        if (category.id === categoryId) {
            let newCategory: ICategory = {
                ...category,
                ...categoryData,
            };
            changedCategory = newCategory;
            return newCategory;
        }
        return category;
    });
    await fileUtil.writeFile(categoriesStorage, categories);
    return changedCategory;
}

async function deleteCategory(categoryId: string): Promise<string> {
    let categories: ICategory[] = await getCategories();
    categories = categories.filter(category => category.id !== categoryId);
    await fileUtil.writeFile(categoriesStorage, categories);
    return categoryId;
}

export {
    getCategories,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
};
