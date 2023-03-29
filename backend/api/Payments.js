// IMPORTING necessary modules & database functions.
const express = require('express');
const creditCardInfoRouter = express.Router();
const jwt = require("jsonwebtoken");
const {} = require("../db");

// Middleware to test api/credCardInfo
creditCardInfoRouter.use((req,res,next) => {
    console.log("A request is being made to /creditCardInfo");

    next();

});

// GET request - 
creditCardInfoRouter.get((req,res,next) => {
    console.log("A get request is being made to /creditCardInfo");

    next();

});

// POST request - Purpose: 
creditCardInfoRouter.post((req,res,next) => {
    console.log("A post request is being made to /creditCardInfo");

    next();

});

// PATCH request - Purpose:
creditCardInfoRouter.patch((req,res,next) => {
    console.log("A patch request is being made to /creditCardInfo");

    next();

});

// DELETE request - Purpose:
creditCardInfoRouter.delete((req,res,next) => {
    console.log("A delete request is being made to /creditCardInfo");

    next();

});

// EXPORTING the route handler.
module.exports = paymentsRouter;