const userService = require('../services/usersService')

async function getUsers(req, res, next){
    try{
        res.json(await userService.getUsers());
    }catch (err){
        next(new Error(err));
    }
}

async function getUserByLogin(req, res, next){
    try{
        res.json(await userService.getUserByLogin(req.params.userLogin));
    }catch (err){
        next(new Error(err));
    }
}

async function createUser(req, res, next){
    try{
        res.json(await userService.addUser(req.body));
    }catch (err){
        next(new Error(err));
    }
}

async function editUser(req, res, next){
    try{
        res.json(await userService.editUser(req.params.userLogin, req.body));
    }catch (err){
        next(new Error(err));
    }
}

async function deleteUser(req, res, next){
    try{
        res.json(await userService.deleteUser(req.params.userLogin));
    }catch (err){
        next(new Error(err));
    }
}
module.exports = {getUserByLogin, createUser, editUser, deleteUser, getUsers}