// IMPORTING necessary modules & database functions.
const express = require('express');
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {} = require("../db");

// Middleware to test api/users
usersRouter.use((req,res,next) => {
    console.log("A request is being made to /users");

    next();

});

// POST request - Purpose: Create a new user, requiring username and password.
usersRouter.post("/register", async (req,res,next) => {
    const {username, password} = req.body;
    console.log(req.body)
    try {
        const _user = await getUserByUsername(username);
        console.log("Password type:", typeof password)
        console.log("Username type:", typeof username)
        if (_user) {  
            res.send({
                name: "UserAlreadyExists",
                message: "A user by that name already exists."
            });
        } else if (password.length < 8) {
            res.send({
                name: "PasswordTooShort",
                message: "Password must be a minimum of 8 characters."
            });
        } else {
            const user = await createUser({username, password});
                if (user.id) {
                    const token = jwt.sign({
                        id: user.id,
                        username
                    }, process.env.JWT_SECRET, {
                        expiresIn: "1w"
                    });
                        res.send({
                        message: "Thank you for signing up to our website!",
                        token
                })};
        };
        
    } catch (error) {
        next(error);
    }
});

// POST request - Purpose: Log in a created user.
usersRouter.post("/login", async (req,res,next) => {
    try {
        const { username, password } = req.body;

    if (!username || !password) {
        res.send({
            name: "Missing Credentials!",
            message: "Please supply both a username and password!"
        });
    };
        const user = await getUserByUsername(username);
        console.log(user)
        const areTheyTheSame = await bcrypt.compare(password, user.password);

        if (user && areTheyTheSame) { // If the user exists & user password matches password from the request body...
            const token = jwt.sign({ // Create token that has users ID & username encrypted by JWT SECRET.
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: "1w"
            });
             // Create token 
            res.send({                                               
                message: "You are now logged in!",
                token: token
            });

        } else {
            res.send({
                name: "Incorrect Credentials!",
                message: "Username or password is incorrect!"
            });
        }
    } catch (error) {
        next(error);
    };

});

// GET request - Purpose: Send back logged-in user's data if a valid token is supplied in the header.
usersRouter.get("/me",  async (req,res,next) => {
    try {
        const userToken = req.headers.authorization.split(" ")[1];
        const decryptedUserToken = jwt.verify(userToken, process.env.JWT_SECRET);       
        const user = await getUserByUsername(decryptedUserToken.username);

        if(user.username == decryptedUserToken.username) {
            res.send({
                id: user.id,
                username: decryptedUserToken.username
            });
        } else {
            res.send({
                name: "Invalid Token",
                message: "Please log in."
            });
        };

    } catch ({name, message}) {
        next({name, message});
    };
});

// GET request - Purpose: Return a list of all vinyl for a logged-in user. 
usersRouter.get("/userid/vinyl",  async (req,res,next) => {
    try {
        const userToken = req.headers.authorization.split(" ")[1];
        const decryptedUserToken = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await getUserByUsername(req.params.username);

        if (decryptedUserToken.username && user.username == decryptedUserToken.username) {
            const userVinyl = await getAllVinylByUser(user.id);
            res.send(userVinyl);
        } else {
            res.send({
                name: "User Not Valid",
                message: "Cannot get vinyl inventory. User is not valid."
            });
        };
    } catch (error) {
        console.log(error);
    };
});

// EXPORTING the route handler.
module.exports = usersRouter;