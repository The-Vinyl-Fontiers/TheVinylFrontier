// IMPORTING
const express = require('express');
const router = express.Router();
const {getUserById} = require("../db")
require("dotenv").config();
const jwt = require("jsonwebtoken")

// GET request - Purpose: To check the server is running.
router.get('/health', async (req, res, next) => {
    console.log("Server is up and all is well!");
    next();
});

//extracting token and adding user to req
router.use(async(req, res, next) => {
    console.log("checking for auth")
    const prefix = 'Bearer ';
  let auth = "";
    if(req.header("Authorization")){
        auth = req.header('Authorization');
    }
    if(req.header("authorization")){
        auth = req.header("authorization")
    }
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { username, password, id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        console.log("added to req.user" , req.user)
        next();
      }
    } catch (error) {
      res.send(error)
    }
  } else {
    res.send({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
})

// Routing from root index.js (/api) to desired path 

const usersRouter = require('./users');
router.use('/users', usersRouter);

const ordersRouter = require('./orders');
router.use('/orders', ordersRouter);

const vinylRouter = require('./vinyl');
router.use('/vinyls', vinylRouter);

const paymentsRouter = require('./Payments');
router.use('/Payments', paymentsRouter);

const orderProductsRouter = require('./order_products');
router.use('/order_products', orderProductsRouter);

const tagsRouter = require('./tags');
router.use('/tags', tagsRouter);

const vinylTagsRouter = require('./vinyl_tags');
router.use('/vinyl_tags', vinylTagsRouter);
// EXPORTING the route handler.
module.exports = router;