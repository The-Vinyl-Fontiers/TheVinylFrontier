// IMPORTING necessary modules & database functions.
const express = require('express');
const tagsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {} = require("../db");

// Middleware to test api/tags
tagsRouter.use((req,res,next) => {
    console.log("A request is being made to /tags");

    next();

});

// GET request - 
tagsRouter.get((req,res,next) => {
    console.log("A  get request is being made to /tags");

    next();

});

// POST request - Purpose: 
tagsRouter.post((req,res,next) => {
    console.log("A post request is being made to /tags");

    next();

});

// PATCH request - Purpose:
tagsRouter.patch((req,res,next) => {
    console.log("A patch request is being made to /tags");

    next();

});

// DELETE request - Purpose:
tagsRouter.delete((req,res,next) => {
    console.log("A delete request is being made to /tags");

    next();

});

// EXPORTING the route handler.
module.exports = tagsRouter;