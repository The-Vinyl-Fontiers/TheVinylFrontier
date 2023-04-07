// IMPORTING necessary modules & database functions.
const express = require('express');
const tagsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllTags, createTag, getTagById, getTagByName, deleteTag  } = require('../db/tags');

// Middleware to test api/tags
tagsRouter.use((req,res,next) => {
    console.log("A request is being made to /tags");

    next();

});

// GET request - 
tagsRouter.get("/", async (req,res,next) => {
    try {
        const tags = await getAllTags()

        res.send(tags)
    } catch (error) {
        next (error)
    }

});

// GET request - 
tagsRouter.get("/:id", async (req,res,next) => {
    const {id} = req.params

    try {
        const tags = await getTagById(id)

        if(tags) {
            res.send(tags)
        }else {
            res.send("No tags were found with that ID").status(404)
        }
    } catch (error) {
        next (error)
    }

});

// GET request - 
tagsRouter.get("/:name", async (req,res,next) => {
    const {name} = req.params

    try {
        const tags = await getTagByName(name)

        if(tags) {
            res.send(tags)
        }else {
            res.send("No tags were found with that name").status(404)
        }
    } catch (error) {
        next (error)
    }

});

// POST request - Purpose: 
tagsRouter.post("/", async (req,res,next) => {
    const {name} = req.body
    const {isAdmin} =req.user

    try {
        if(!isAdmin) { //checks for admin 
            res.send("You must be an admin to perform this action")
        } else  if(!name) { //checks for valid fields
            res.send("Invalid tag data.").status(400)
        }else {
            const newTag = await createTag(name)

            if(newTag) {
                res.send(newTag)
            }else { //if tag wasn't able to be created
                res.send("Your tag was unable to be created.").status(500)
            }
        }
    }catch (error) {
        next (error)
    }
});

// DELETE request - Purpose:
tagsRouter.delete("/:id", async (req,res,next) => {
    const {id} = req.params
    const {isAdmin} = req.user

    try {
        if(!isAdmin) { //checks for admin 
            res.send("You must be an admin to perform this action")
        } else  if(!id) { //checks for valid fields
            res.send("A tag ID must be provided.").status(400)
        }else {
            const tag = await deleteTag(id)

            if(tag) {
                res.send(tag)
            }else { //if tag wasn't able to be deleted
                res.send("No tag was found with that ID.").status(500)
            }
        }
    } catch (error) {
        next (error)
    }

});

// EXPORTING the route handler.
module.exports = tagsRouter;