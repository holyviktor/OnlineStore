const ROUTES = {
    GET: '/',
    GET_USER_ORDERS: '/:userLogin',
    GET_BY_ID: '/:orderId',
    CREATE: '/:userLogin/create',
    DELETE: '/:userLogin/delete/:orderId',
}
module.exports = {ROUTES};