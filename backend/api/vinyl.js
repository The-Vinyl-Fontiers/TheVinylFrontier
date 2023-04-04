// IMPORTING necessary modules & database functions.
const express = require('express');
const vinylRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllVinyls, createVinyl, updateVinyl, deleteVinyl, getVinylByID, getVinylsByArtist, addTagToVinyl, getTagById, removeTagFromVinyl } = require("../db");

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

// POST request - Purpose: create new vinyl
vinylRouter.post( "/", async(req,res,next) => {
    console.log("A post request is being made to /vinyl");

    const {title, artist, yearReleased, price, imgURL, tags} = req.body
 
    const {isAdmin}= req.user 

    try {
        if(!isAdmin) { //checks for admin 
            res.send("You must be an admin to perform this action")
        } else  if(!title || !artist || !yearReleased || !price || !imgURL) { //checks for valid fields
            res.send("Invalid vinyl data.").status(400)
        }else {
            const createdVinyl = await createVinyl({title, artist, yearReleased, price, imgURL})

            if(tags) { //if tags were included add them to the created vinyl
                await Promise.all(tags.map(
                    tag => addTagToVinyl(tag.id,createdVinyl.id ) //IDK if this will work, the tags in the req must have an ID
                    //MAYBE: replace with getTagByName and then addTagToVinyl
                ))
            }

            const vinyl = await getVinylByID(createdVinyl.id) //get vinyl with tags

            if(vinyl) {
                res.send(vinyl)
            }else { //if vinyl wasn't able to be created
                res.send("Your vinyl was unable to be created.").status(500)
            }
        }
    } catch (error) {
        res.send(error)
    }

});

// PATCH request - Purpose: update a vinyl
vinylRouter.patch("/",  async (req,res,next) => {
    console.log("A patch request is being made to /vinyl");

    const {title, artist, yearReleased, price, imgURL, id} = req.body
 
    const {isAdmin}= req.user 

    try {
        if(!isAdmin) { //checks for admin 
            res.send("You must be an admin to perform this action")
        } else  if(!title || !artist || !yearReleased || !price || !imgURL || !id) { //checks for valid fields
            res.send("Invalid vinyl data.").status(400)
        }else {
            const vinyl = await updateVinyl({title, artist, yearReleased, price: price.toFixed(2), imgURL, id})

            if(vinyl) {
                res.send(vinyl)
            }else { //if vinyl wasn't able to be created
                res.send("Your vinyl was unable to be created.").status(500)
            }
        }
    } catch (error) {
        res.send(error)
    }

});

// DELETE request - Purpose: delete a vinyl
vinylRouter.delete("/:id", async(req,res,next) => {
    console.log("A delete request is being made to /vinyl");
    const {isAdmin}= req.user 
    const {id} = req.params
    try {
        if(!isAdmin) { //checks for admin 
            res.send("You must be an admin to perform this action")
        } else  if(!id) { //checks for valid fields
            res.send("A vinyl ID must be provided.").status(400)
        }else {
            const vinyl = await deleteVinyl(id)

            if(vinyl) {
                res.send(vinyl)
            }else { //if vinyl wasn't able to be deleted
                res.send("No vinyl was found with that ID.").status(500)
            }
        }
    } catch (error) {
        res.send(error)
    }

});

// GET ID REQUEST -- get specific vinyl
vinylRouter.get("/:id" , async(res, req) => {
    const {id} = req.params

    try {
        const vinyl = await getVinylByID(id)

        if(vinyl) {
            res.send(vinyl)
        }else {
            res.send("No vinyl was found with that ID").status(404)
        }
    } catch (error) {
        res.send(error)    
    }
})

//GET vinyls by artists 
//MAYBE: Move to another subrouter so url isnt /vinyl/artist/artistName
vinylRouter.get("/artist/:artist", async (req, res) =>{
    const {artist} = req.params
    try {
        const vinyls = await getVinylsByArtist(artist) 

        if(vinyls) {
            res.send(vinyls)
        } else {
            res.send("No vinyls were found from that artist.").status(404)
        }
    } catch (error) {
        res.send(error)
    }
}) 

//POST to specific vinyl -- Adds a specified tag to the vinyl
vinylRouter.post("/:id" , async(req, res) =>{
    const {id} = req.params;
    const {tagID} = req.body;
    try {
        if(!tagID) {
            res.send("You must include a tag ID to add.").status(400)
        }else {
            const tag = await getTagById(tagID)
            if(!tag){
                res.send("No tag was found with that ID").status(404)
            } else {
                const vinyl = await getVinylByID(id);
                if(!vinyl) {
                    res.send("No vinyl was found with that ID").status(404)
                } else {
                    const vinylTag = await addTagToVinyl(tagID, id)

                    res.send(vinylTag)
                }
            }
        }
    } catch (error) {
        res.send(error)
    }
})

//DELETE specific tag from specific vinyl 
vinylRouter.delete("/:vinylID/:tagID", async (req, res) => {
    const {vinylID, tagID} = req.params;

    try {
        const vinyl = await getVinylByID(parseInt(vinylID));
        if(!vinyl) {
            res.send("No vinyl was found with that ID.").status(404);
        } else {
            // const tag = await getTagById(parseInt(tagID));
            // if(!tag ){
                // res.send("No tag was found with that ID").status(404)
            // }else {


                //Need getTagByID to be able to check if tag exists
                const vinyl = await removeTagFromVinyl(parseInt(tagID), parseInt(vinylID))
                
                res.send(vinyl)
            // }
        }
    } catch (error) {
        res.send(error)
    }
})

// EXPORTING the route handler. 
module.exports = vinylRouter;