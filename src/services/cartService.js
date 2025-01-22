const cartAccessor = require('../accessors/cartAccessor');
const userService = require('./usersService');
const productService = require('./productsService');
const CustomError = require('../handlers/customError');

async function getCartByLogin(userLogin, authorizedRole, authorizedLogin) {
    if (!userService.checkIfRoleAppropriate(userLogin, authorizedRole, authorizedLogin))
        throw new CustomError(403, "Access denied!");
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
   return cartAccessor.getCartByUserLogin(userLogin);
}

async function addToCart(userLogin, productId, count, authorizedRole, authorizedLogin){
    if (!userService.checkIfRoleAppropriate(userLogin, authorizedRole, authorizedLogin))
        throw new CustomError(403, "Access denied!");
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    if (!await productService.checkIfProductExists(productId)){
        throw new CustomError(404, "Product doesn't exists");
    }
    if (count <= 0){
        throw new CustomError(400, "Count to add must be more than 0");
    }
    return cartAccessor.addToCart(userLogin, productId, count);
}

async function clearFromCart(userLogin, productId, authorizedRole, authorizedLogin){
    if (!userService.checkIfRoleAppropriate(userLogin, authorizedRole, authorizedLogin))
        throw new CustomError(403, "Access denied!");
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    if (!await productService.checkIfProductExists(productId)){
        throw new CustomError(404, "Product doesn't exists");
    }
    if (!await checkIfProductInCart(userLogin, productId)){
        throw new CustomError(400, "User don't have this product in cart");
    }
    return cartAccessor.clearFromCart(userLogin, productId);
}

async function subtractFromCart(userLogin, productId, authorizedRole, authorizedLogin){
    if (!userService.checkIfRoleAppropriate(userLogin, authorizedRole, authorizedLogin))
        throw new CustomError(403, "Access denied!");
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    if (!await productService.checkIfProductExists(productId)){
        throw new CustomError(404, "Product doesn't exists");
    }
    if (!await checkIfProductInCart(userLogin, productId)){
        throw new CustomError(400, "User don't have this product in cart");
    }
    return cartAccessor.subtractFromCart(userLogin, productId);
}

async function setToCart(userLogin, productId, count, authorizedRole, authorizedLogin){
    if (!userService.checkIfRoleAppropriate(userLogin, authorizedRole, authorizedLogin))
        throw new CustomError(403, "Access denied!");
    if (!await userService.checkIfUserExists(userLogin)){
        throw new CustomError(404, "User doesn't exists");
    }
    if (!await productService.checkIfProductExists(productId)){
        throw new CustomError(404, "Product doesn't exists");
    }
    if (count < 0){
        throw new CustomError(400, "Count to add must be more or equal to 0");
    }
    return cartAccessor.setToCart(userLogin, productId, count);
}

async function checkIfProductInCart(userLogin, productId) {
    let user = await userService.getUserByLogin(userLogin);
    return user?.cart.find(obj => obj.productId === productId) || null;
}

module.exports = {getCartByLogin, addToCart, setToCart, clearFromCart, subtractFromCart}
