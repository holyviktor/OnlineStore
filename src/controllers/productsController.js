const productsService = require('../services/productsService');

async function getProducts(req, res, next){
    try{
        res.json(await productsService.get());
    }catch (err){
        next(err);
    }
}

async function getProductsByCategory(req, res, next){
    try{
        res.json(await productsService.getByCategory(req.params.categoryId));
    }catch (err){
        next(err);
    }
}
async function getProductById(req, res, next){
    try{
        res.json(await productsService.getById(req.params.productId));
    }catch (err){
        next(err);
    }
}

async function addProduct(req, res, next){
    try{
        res.json(await productsService.add(req.body));
    }catch (err){
        next(err);
    }
}

async function editProducts(req, res, next){
    try{
        res.json(await productsService.edit(req.params.productId, req.body));
    }catch (err){
        next(err);
    }
}

async function deleteProduct(req, res, next){
    try{
        res.json(await productsService.del(req.params.productId));
    }catch (err){
        next(err);
    }
}


module.exports = {getProducts, addProduct, editProducts, getProductsByCategory, deleteProduct, getProductById}