const requiredProperties = ['login', 'password', 'email', 'phoneNumber'];
const regExpEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpPhoneNumber = /^(?:\+380|380|0)\d{9}$/;

const ROUTES = {
    GET: '/',
    GET_BY_LOGIN: '/:userLogin',
    REGISTER: '/register',
    LOGIN: '/login',
    EDIT: '/edit/:userLogin',
    DELETE: '/delete/:userLogin',
};

module.exports = {
    requiredProperties,
    regExpEmail,
    regExpPhoneNumber,
    ROUTES,
};
