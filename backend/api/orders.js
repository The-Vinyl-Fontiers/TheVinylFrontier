// IMPORTING necessary modules & database functions.
const express = require('express');
const ordersRouter = express.Router();
const jwt = require("jsonwebtoken");
const {} = require("../db");

// Middleware to test api/orders
ordersRouter.use((req,res,next) => {
    console.log("A request is being made to /orders");

    next();

});

// GET request - 
ordersRouter.get((req,res,next) => {
    console.log("A get request is being made to /orders");

    next();

});

// POST request - Purpose: 
ordersRouter.post((req,res,next) => {
    console.log("A post request is being made to /orders");

    next();

});

// PATCH request - Purpose:
ordersRouter.patch((req,res,next) => {
    console.log("A patch request is being made to /orders");

    next();

});

// DELETE request - Purpose:
ordersRouter.delete((req,res,next) => {
    console.log("A delete request is being made to /orders");

    next();

});

// EXPORTING the route handler.
module.exports = ordersRouter;