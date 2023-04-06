// IMPORTING necessary modules & database functions.
const express = require('express');
const ordersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getOrderByID, getPendingOrderByUserID, createOrder, createOrderProduct, setOrderStatus, deleteOrderProduct, incrementOrderProduct } = require("../db");

// Middleware to test api/orders
ordersRouter.use((req,res,next) => {
    console.log("A request is being made to /orders");

    next();

});

// GET request - 
ordersRouter.get("/:orderID" , async (req,res,next) => {
    const {orderID} = req.params

    try {
        //check for logged in
        if(!req.user) {
            res.send({error: "NotLoggedIn", message: "You must be logged in to perform this action"})
        } else{
            const order = await getOrderByID(orderID)

            //check if current user is the owner of the order or admin
            if(order.userID != req.user.id && !req.user.isAdmin){
                res.send({error: "Unauthorized", message: "You do not have the correct credentials to access this order"})
            }else {
                res.send(order)
            }
        }
    } catch (error) {
        res.send(error)
    }
});

// POST request - Purpose: create a new pending order for a user
ordersRouter.post("/" , async (req,res,next) => {
    console.log("A post request is being made to /orders");

    try {
        //check for logged in
        if (!req.user) {
            res.send({error: "NotLoggedIn", message: "You must be logged in to perform this action"})
        } else {
            //check that the user does not currently have a pending order
            const pendingOrder = await getPendingOrderByUserID(req.user.id)
            console.log(pendingOrder)

            //if they do send back an error
            if(pendingOrder) {
                res.send({error: "PendingOrderActive", message: "This user already has a pending order. Please submit that order before creating a new order."})
            } else { //else create an order and send it back
                const createdOrder = await createOrder(req.user.id)

                res.send(createdOrder)
            }
        }
    } catch (error) {
        res.send(error)
    }
});


//POST request to /:orderID/:vinylID -- add new product to order
ordersRouter.post("/:orderID/:vinylID", async (req, res) =>{
    const {orderID, vinylID} = req.params
    console.log("Adding vinyl with ID " + vinylID + " to order " + orderID)
    try {
        //check for logged in
        if(!req.user) {
            res.send({error: "NotLoggedIn", message: "You must be logged in to perform this action"})
        } else{
            const order = await getOrderByID(orderID)

            //check if current user is the owner of the order or admin
            if(order.userID != req.user.id && !req.user.isAdmin){
                res.send({error: "Unauthorized", message: "You do not have the correct credentials to access this order"})
            }else {
                //check whether the order already contains the vinyl
                let containsProduct = false;
                for(let i = 0; i < order.products.length; i++) {
                    if(order.products[i].id == vinylID) {
                        containsProduct = true;
                        break;
                    }
                }
                console.log(containsProduct)
                if(containsProduct) { //if it does, increment the quantity by one
                    const order = await incrementOrderProduct(orderID, vinylID)

                    res.send(order)
                }else {
                     //create the new order_product and send back the new order
                    const updatedOrder = await createOrderProduct(orderID, vinylID)

                    res.send(updatedOrder)
                }
            }
        }
    } catch (error) {
        res.send(error)
    }
})

// PATCH request - Purpose:change the status of an order
ordersRouter.patch("/:orderID" , async(req,res,next) => {
    console.log("A patch request is being made to /orders");
    const {orderID} = req.params;
    try {
        //check for logged in
        if(!req.user) {
            res.send({error: "NotLoggedIn", message: "You must be logged in to perform this action"})
        } else{
            const order = await getOrderByID(orderID)

            //check if current user is the owner of the order or admin
            if(order.userID != req.user.id && !req.user.isAdmin){
                res.send({error: "Unauthorized", message: "You do not have the correct credentials to access this order"})
            }else {
                const {status} = req.body
                //check that a status was included
                if(!status){
                    res.send({error: "NoDataProvided", message: "Please indicate what status to change to."})
                } else {
                    //update the status and send back the updated order
                    const updatedOrder = await setOrderStatus(orderID, status)

                    //if the order status was changed from pending create a new pending order
                    if(order.status == "pending") {
                        //if changing to pending make sure they dont have an already pending order
                        const pendingOrder = await getPendingOrderByUserID(req.user.id)

                        if(pendingOrder) {
                            res.send({error: "PendingOrderActive", message: "This user already has a pending order. Please submit that order before creating a new order."})
                        } else {
                            const newOrder = await createOrder(req.user.id)
                            res.send({updatedOrder, newOrder})
                        }
                    } else {
                        res.send(updatedOrder)
                    }
                }
            }
        }
    } catch (error) {
        res.send(error)
    }
});

// DELETE request - Purpose: to remove a product from an order
ordersRouter.delete("/:orderID/:vinylID", async (req,res,next) => {
    const {orderID, vinylID} = req.params
    try {
        //check for logged in
        if(!req.user) {
            res.send({error: "NotLoggedIn", message: "You must be logged in to perform this action"})
        } else{
            const order = await getOrderByID(orderID)

            //check if current user is the owner of the order or admin
            if(order.userID != req.user.id && !req.user.isAdmin){
                res.send({error: "Unauthorized", message: "You do not have the correct credentials to access this order"})
            }else {
                //create the new order_product and send back the new order
                const updatedOrder = await deleteOrderProduct(orderID, vinylID)

                res.send(updatedOrder)
            }
        }
    } catch (error) {
        res.send(error)
    }
});


ordersRouter.get("/me/cart", async (req, res) => {
    try {
        //check for logged in
        if(!req.user) {
            res.send({error: "NotLoggedIn", message: "You must be logged in to perform this action"})
        } else{
            console.log(req.user)
            const cart = await getPendingOrderByUserID(req.user.id)

            //check if current user is the owner of the order or admin
            if(cart.userID != req.user.id && !req.user.isAdmin){
                res.send({error: "Unauthorized", message: "You do not have the correct credentials to access this order"})
            }else {
                //if cart is empty, send back empty array
                    res.send(cart)
                
                
            }
        }
    } catch (error) {
        res.send(error)
    }
})

// EXPORTING the route handler.
module.exports = ordersRouter;