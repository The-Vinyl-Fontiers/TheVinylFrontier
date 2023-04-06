// IMPORTING necessary modules & database functions.
const express = require('express');
const paymentsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getCreditCardInfo, createPaymentInfo, deleteCreditCardInfo, updatePaymentInfo } = require('../db/Payments');

// Middleware to test api/credCardInfo
paymentsRouter.use((req,res,next) => {
    console.log("A request is being made to /creditCardInfo");

    next();

});

// GET request - 
paymentsRouter.get("/" , async (req,res,next) => {
    try {
        if (!req.user) {
            res.send ({error: "NotLoggedIn", message: "You must log in to perform this action."})
        } else {
            const ccinfo = await getCreditCardInfo(id, UserID)

            if (ccinfo.userID != req.user.id || !req.user.isAdmin) {
                res.send ({error: "Unauthorized", message: "You do not have permission to view this information."})
            } else {
                res.send(ccinfo)
            }
        }
    } catch (error) {
        next (error) 
    }

});

// POST request - Purpose: 
paymentsRouter.post("/" , async (req,res,next) => {

    const {Address, CCNum, cardholderName, CVVNum} = req.body
    const {id} = req.user;

    try {
        if (!req.user) {
            res.send ({error: "NotLoggedIn", message: "You must log in to perform this action."})
        } else if (!Address || !CCNum || !cardholderName || !CVVNum ) {
            res.send ("Invalid credit card info data.").status(400) ;
        }else {
            const newCCInfo = await createPaymentInfo({UserID: id, Address, CCNum, cardholderName, CVVNum})

            res.send(newCCInfo) ;
        } 
    } catch (error) {
        next (error)
    }
});

// PATCH request - Purpose:
paymentsRouter.patch("/", async (req,res,next) => {
    const { Address, CCNum, cardholderName, CVVNum } = req.body

    try {
        if (!req.user) {
            res.send ({error: "NotLoggedIn", message: "You must log in to perform this action."})
        } else if (!Address || !CCNum || !cardholderName || !CVVNum ) {
            res.send ("Invalid credit card info data.").status(400) ;
        } else {
            const newInfo = await updatePaymentInfo({ Address, CCNum, cardholderName, CVVNum })
            
            if (newInfo) {
                res.send(newInfo)
            } else {
                res.send("Your credit card info was unable to be updated.").status(500)
            }
        }
    } catch (error) {
        
    }

});

// DELETE request - Purpose:
paymentsRouter.delete("/:UserID/:CCInfoID" , async (req,res,next) => {
    const { UserID, CCInfoID } = req.params

    try {
        if (!req.user) {
            res.send ({error: "NotLoggedIn", message: "You must log in to perform this action."})
        }else {
            const ccinfo = await getCreditCardInfo(id, UserID)

            if (ccinfo.userID != req.user.id || !req.user.isAdmin) {
                res.send ({error: "Unauthorized", message: "You do not have permission to view this information."})
            } else {
                const deletedCCInfo = await deleteCreditCardInfo (UserID, CCInfoID)
                res.send(deletedCCInfo)
            }
        } 
    } catch (error) {
        next (error)
    }
});

// EXPORTING the route handler.
module.exports = paymentsRouter;