const categoriesService = require('../services/categoriesService');

async function getCategories(req, res, next){
    try{
        res.json(await categoriesService.get());
    }catch (err){
        next(new Error(err));
    }
}

async function getCategoryById(req, res, next){
    try{
        res.json(await categoriesService.getById(req.params.categoryId));
    }catch (err){
        next(new Error(err));
    }
}

async function addCategory(req, res, next){
    try{
        res.json(await categoriesService.add(req.body.categoryToAdd));
    }catch (err){
        next(new Error(err));
    }
}

async function editCategory(req, res, next){
    try{
        res.json(await categoriesService.edit(req.body.categoryId, req.body.categoryData));
    }catch (err){
        next(new Error(err));
    }
}

async function deleteCategory(req, res, next){
    try{
        res.json(await categoriesService.del(req.body.categoryId));
    }catch (err){
        next(new Error(err));
    }
}

module.exports = {
    getCategories, getCategoryById, addCategory, editCategory, deleteCategory
}