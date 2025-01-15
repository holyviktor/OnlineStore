const requiredProperties = ["login", "password", "email", "phoneNumber"];
const regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpPhoneNumber = /^(?:\+380|380|0)\d{9}$/;

const ROUTES = {
    GET: '/',
    GET_BY_LOGIN: '/:userLogin',
    CREATE: '/create',
    EDIT: '/edit/:userLogin',
    DELETE: '/delete/:userLogin',
    CART: '/:userLogin/cart'
}

module.exports = {requiredProperties, regExpEmail, regExpPhoneNumber, ROUTES};
