const cartService = require('../services/cartService');

async function getByLogin(req, res, next){
    try{
        res.json(await cartService.getCartByLogin(req.params.userLogin));
    }catch (err){
        next(err);
    }
}

async function add(req, res, next){
    try{
        res.json(await cartService.addToCart(req.params.userLogin, req.body.productId, req.body.count));
    }catch (err){
        next(err);
    }
}

async function clear(req, res, next){
    try{
        res.json(await cartService.clearFromCart(req.params.userLogin, req.params.productId));
    }catch (err){
        next(err);
    }
}

async function subtract(req, res, next){
    try{
        res.json(await cartService.subtractFromCart(req.params.userLogin, req.params.productId));
    }catch (err){
        next(err);
    }
}

async function set(req, res, next){
    try{
        res.json(await cartService.setToCart(req.params.userLogin, req.body.productId, req.body.count));
    }catch (err){
        next(err);
    }
}

module.exports = {getByLogin, add, set, clear, subtract}