// IMPORTING necessary modules & database functions.
const express = require('express');
const vinylRouter = express.Router();
const jwt = require("jsonwebtoken");
const {} = require("../db");

// Middleware to test api/vinyl
vinylRouter.use((req,res,next) => {
    console.log("A request is being made to /vinyl");

    next();

});

// GET request - 
vinylRouter.get((req,res,next) => {
    console.log("A get request is being made to /vinyl");

    next();

});

// POST request - Purpose: 
vinylRouter.post((req,res,next) => {
    console.log("A post request is being made to /vinyl");

    next();

});

// PATCH request - Purpose:
vinylRouter.patch((req,res,next) => {
    console.log("A patch request is being made to /vinyl");

    next();

});

// DELETE request - Purpose:
vinylRouter.delete((req,res,next) => {
    console.log("A delete request is being made to /vinyl");

    next();

});

// EXPORTING the route handler. 
module.exports = vinylRouter;