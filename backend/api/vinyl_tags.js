// IMPORTING necessary modules & database functions.
const express = require('express');
const vinylTagsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {} = require("../db");

// Middleware to test api/vinylTags
vinylTagsRouter.use((req,res,next) => {
    console.log("A request is being made to /vinyl_tags");

    next();

});

// GET request - 
vinylTagsRouter.get((req,res,next) => {
    console.log("A  get request is being made to /vinyl_tags");

    next();

});

// POST request - Purpose: 
vinylTagsRouter.post((req,res,next) => {
    console.log("A post request is being made to /vinyl_tags");

    next();

});

// PATCH request - Purpose:
vinylTagsRouter.patch((req,res,next) => {
    console.log("A patch request is being made to /vinyl_tags");

    next();

});

// DELETE request - Purpose:
vinylTagsRouter.delete((req,res,next) => {
    console.log("A delete request is being made to /vinyl_tags");

    next();

});

// EXPORTING the route handler. 
module.exports = vinylTagsRouter;