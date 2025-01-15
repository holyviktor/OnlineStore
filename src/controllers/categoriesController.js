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
        res.json(await categoriesService.add(req.body));
    }catch (err){
        next(new Error(err));
    }
}

async function editCategory(req, res, next){
    try{
        res.json(await categoriesService.edit(req.params.categoryId, req.body));
    }catch (err){
        next(new Error(err));
    }
}

async function deleteCategory(req, res, next){
    try{
        res.json(await categoriesService.del(req.params.categoryId));
    }catch (err){
        next(new Error(err));
    }
}

module.exports = {
    getCategories, getCategoryById, addCategory, editCategory, deleteCategory
}