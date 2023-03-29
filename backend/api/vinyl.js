// IMPORTING necessary modules & database functions.
const express = require('express');
const vinylRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllVinyls, createVinyl } = require("../db");

// Middleware to test api/vinyl
vinylRouter.use((req,res,next) => {
    console.log("A request is being made to /vinyl");

    next();

});

// GET request - 
vinylRouter.get( "/", async (req,res,next) => {
    console.log("A get request is being made to /vinyl");
    try {
        const vinyls = await getAllVinyls()

        res.send(vinyls)
    } catch (error) {
        res.send(error)
    }
});

// POST request - Purpose: 
vinylRouter.post( "/", async(req,res,next) => {
    console.log("A post request is being made to /vinyl");

    const {title, artist, yearReleased, price, imgURL} = req.body
 
    const {isAdmin}= req.body.user //THIS MUST BE CHANGED TO req.user WHEN WE ADD req.user 

    try {
        if(!isAdmin) {
            res.send("You must be an admin to perform this action")
        }

        if(!title || !artist || !yearReleased || !price || !imgURL) {
            res.send("Invalid vinyl data.").status()
        }

        const vinyl = await createVinyl({title, artist, yearReleased, price, imgURL})

        if(vinyl) {
            res.send(vinyl)
        }else {
            res.send("Your vinyl was unable to be created.").status(500)
        }
        
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