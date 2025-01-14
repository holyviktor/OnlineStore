const express = require('express');

const app = express();
const port = process.env.SERVER_PORT || 3000;

const categoriesRouter = require('./src/routes/categoriesRoute');
const productsRouter = require('./src/routes/productsRoute');
const errorHandler = require('./src/handlers/errorHandler');

const ROUTES = {
    PRODUCTS: '/products',
    PROFILE: '/profile',
    CATEGORIES: '/categories'
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(ROUTES.PRODUCTS, productsRouter);
app.use(ROUTES.CATEGORIES, categoriesRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Store app listening on port ${port}`)
})