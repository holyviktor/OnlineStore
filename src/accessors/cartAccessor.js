const fileUtil = require('../utils/fileUtil');
const storageConfig = require('../configs/storageConfig');
const {getUserByLogin, getUsers} = require("./usersAccessor");
const usersStorage = `${storageConfig.storageDirectory}${storageConfig.storageFiles.USERS}`;

async function getCartByUserLogin(userLogin){
    let user = await getUserByLogin(userLogin);
    return user?.cart;
}

async function addToCart(userLogin, productId, count){
    let users = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            const updatedCart = [...user.cart];

            const existingProduct = updatedCart.find(obj => obj.productId === productId);

            if (existingProduct){
                existingProduct.count += count;
            }else {
                updatedCart.push({productId:productId, count:count});
            }
            return { ...user, cart: updatedCart };
        }
        return user;
    })
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

async function subtractFromCart(userLogin, productId){
    let users = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedCart = [...user.cart];

            const existingProduct = updatedCart.find(obj => obj.productId === productId);
            if (existingProduct) {
                if (existingProduct.count > 1) {
                    existingProduct.count -= 1;
                } else {
                    updatedCart = updatedCart.filter(obj => obj.productId !== productId);
                }
            }
            return { ...user, cart: updatedCart };
        }
        return user;
    })
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

async function setToCart(userLogin, productId, count){
    let users = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedCart = [...user.cart];

            const existingProduct = updatedCart.find(obj => obj.productId === productId);

            if (existingProduct){
                if (count === 0){
                    updatedCart = updatedCart.filter(obj => obj.productId !== productId);
                }else {
                    existingProduct.count = count;
                }
            }else {
                updatedCart.push({productId:productId, count:count});
            }
            return { ...user, cart: updatedCart };
        }
        return user;
    })
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

async function clearFromCart(userLogin, productId){
    let users = await getUsers();
    users = users.map(user => {
        if (user.login === userLogin) {
            let updatedCart = [...user.cart];
            updatedCart = updatedCart.filter(obj => obj.productId !== productId);
            return { ...user, cart: updatedCart };
        }
        return user;
    })
    await fileUtil.writeFile(usersStorage, users);
    return productId;
}

module.exports = {getCartByUserLogin, addToCart, clearFromCart, subtractFromCart, setToCart};