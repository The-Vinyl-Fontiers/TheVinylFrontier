// IMPORTING necessary modules & database functions.
const express = require('express');
const orderProductsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {} = require("../db");

// Middleware to test api/orderProducts
orderProductsRouter.use((req,res,next) => {
    console.log("A request is being made to /order_products");

    next();

});

// GET request - 
orderProductsRouter.get((req,res,next) => {
    console.log("A  get request is being made to /order_products");

    next();

});

// POST request - Purpose: 
orderProductsRouter.post((req,res,next) => {
    console.log("A post request is being made to /order_products");

    next();

});

// PATCH request - Purpose:
orderProductsRouter.patch((req,res,next) => {
    console.log("A patch request is being made to /order_products");

    next();

});

// DELETE request - Purpose:
orderProductsRouter.delete((req,res,next) => {
    console.log("A delete request is being made to /order_products");

    next();

});

// EXPORTING the route handler.
module.exports = orderProductsRouter;