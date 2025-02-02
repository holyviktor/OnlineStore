const ROUTES: Record<string, string> = {
    GET: '/:userLogin',
    ADD: '/:userLogin/add',
    SET: '/:userLogin/set',
    SUBTRACT: '/:userLogin/subtract/:productId',
    CLEAR: '/:userLogin/clear/:productId',
};

export { ROUTES };
