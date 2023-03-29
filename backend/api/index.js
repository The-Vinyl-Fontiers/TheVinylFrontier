// IMPORTING
const express = require('express');
const router = express.Router();

// GET request - Purpose: To check the server is running.
router.get('/health', async (req, res, next) => {
    console.log("Server is up and all is well!");
    next();
});

// Routing from root index.js (/api) to desired path 

const usersRouter = require('./users');
router.use('/users', usersRouter);

const ordersRouter = require('./orders');
router.use('/orders', ordersRouter);

const vinylRouter = require('./vinyl');
router.use('/vinyl', vinylRouter);

// const paymentsRouter = require('./Payments');
// router.use('/Payments', paymentsRouter);

const orderProductsRouter = require('./order_products');
router.use('/order_products', orderProductsRouter);

const tagsRouter = require('./tags');
router.use('/tags', tagsRouter);

const vinylTagsRouter = require('./vinyl_tags');
router.use('/vinyl_tags', vinylTagsRouter);
// EXPORTING the route handler.
module.exports = router;