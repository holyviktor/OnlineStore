const express = require("express");
require("dotenv").config();

const errorHandler = require("./src/handlers/errorHandler");
const { ROUTES } = require("./src/constants/indexConstants");

const categoriesRouter = require("./src/routes/categoriesRoute");
const productsRouter = require("./src/routes/productsRoute");
const usersRouter = require("./src/routes/usersRoute");
const cartRouter = require("./src/routes/cartRoute");
const ordersRouter = require("./src/routes/ordersRoute");

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(ROUTES.CART, cartRouter);
app.use(ROUTES.PRODUCTS, productsRouter);
app.use(ROUTES.CATEGORIES, categoriesRouter);
app.use(ROUTES.USERS, usersRouter);
app.use(ROUTES.ORDERS, ordersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Store app listening on port ${port}`);
});
