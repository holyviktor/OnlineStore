import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();

import { handleErrors } from './src/handlers/errorHandler';
import { ROUTES } from './src/constants/indexConstants';

import { router as categoriesRouter } from './src/routes/categoriesRoute';
import { router as productsRouter } from './src/routes/productsRoute';
import { router as usersRouter } from './src/routes/usersRoute';
import { router as cartRouter } from './src/routes/cartRoute';
import { router as ordersRouter } from './src/routes/ordersRoute';
import { CustomError } from './src/handlers/customError';

if (!process.env.DB_CONNECTION_STRING) {
    throw new CustomError(500, 'No connection string!');
}
mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('Connected to database.'));

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(ROUTES.CART, cartRouter);
app.use(ROUTES.PRODUCTS, productsRouter);
app.use(ROUTES.CATEGORIES, categoriesRouter);
app.use(ROUTES.USERS, usersRouter);
app.use(ROUTES.ORDERS, ordersRouter);

app.use(handleErrors);

app.listen(port, () => {
    console.log(`Store app listening on port ${port}`);
});
