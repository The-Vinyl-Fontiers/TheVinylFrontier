// IMPORTING necessary modules & database functions.
const express = require('express');
const vinylRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllVinyls } = require("../db");

// Middleware to test api/vinyl
vinylRouter.use((req,res,next) => {
    console.log("A request is being made to /vinyl");

    next();

});

// GET request - 
vinylRouter.get(async (req,res,next) => {
    console.log("A get request is being made to /vinyl");
    try {
        const vinyls = await getAllVinyls()

        res.send(vinyls)
    } catch (error) {
        res.send(error)
    }
});

// POST request - Purpose: 
vinylRouter.post((req,res,next) => {
    console.log("A post request is being made to /vinyl");
    try {
        
    } catch (error) {
        res.send(error)
    }

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