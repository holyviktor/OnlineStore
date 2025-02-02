const ROUTES: Record<string, string> = {
    GET: '/',
    GET_BY_ID: '/:productId',
    GET_BY_CATEGORY: '/category/:categoryId',
    ADD: '/add',
    DELETE: '/delete/:productId',
    EDIT: '/edit/:productId',
};

export { ROUTES };
