// IMPORTING necessary modules & database functions.
const express = require('express');
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserByUsername, createUser, makeUserAdmin, createOrder, updateUser, getAllUsers, getUserById, removeAdminStatus, deleteUser } = require("../db");
const { async } = require('q');

// Middleware to test api/users
// usersRouter.use((req,res,next) => {
//     console.log("A request is being made to /users");

//     next();

// });

// POST request - Purpose: Create a new user, requiring username and password.
usersRouter.post("/register", async (req, res, next) => {
    const { username, password, email } = req.body;
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
            const user = await createUser({ username, password, email });
            if (user.id) {
                const token = jwt.sign({
                    id: user.id,
                    username,
                    isAdmin: user.isAdmin
                }, process.env.JWT_SECRET, {
                    expiresIn: "1w"
                });

                //create a new pending order for the user
                const order = await createOrder(user.id)

                res.send({
                    message: "Thank you for signing up to our website!",
                    token
                })
            };
        };

    } catch (error) {
        next(error);
    }
});

// POST request - Purpose: Log in a created user.
usersRouter.post("/login", async (req, res, next) => {
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
                username,
                isAdmin: user.isAdmin
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
usersRouter.get("/me", async (req, res, next) => {
    console.log("a request is being made to users/me")
    try {
        const { username } = req.user

        const user = await getUserByUsername(username);

        if (user.username == username) {
            res.send({
                id: user.id,
                username: username,
                isAdmin: user.isAdmin
            });
        } else {
            res.send({
                name: "Invalid Token",
                message: "Please log in."
            });
        };

    } catch (error) {
        res.send(error);
    };
});

// GET request - Purpose: Return a list of all vinyl for a logged-in user. 
usersRouter.get("/userid/vinyl", async (req, res, next) => {
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


//change admin status of user
usersRouter.post("/:userID/admin", async (req, res) => {
    try {
        const { isAdmin, username, id } = req.user
        if (!isAdmin) {
            res.send({
                name: "Must be admin",
                message: "You do not have authorization to perform this action."
            }).status(403)
        } else {
            const { userID } = req.params;

            //check whether user is admin already
            const user = await getUserById(userID)

            if(user.isAdmin) {
                const updatedUser = await removeAdminStatus(userID)

                res.send(updatedUser)

            } else {
                const updatedUser = await makeUserAdmin(userID)

                res.send(updatedUser)
            }

            
        }
    } catch (error) {
        res.send(error)
    }
})

usersRouter.patch('/:username', async (req, res) => {
    const { username } = req.params;
    const { email, password } = req.body;
    const newUsername = req.body.username;

    const saltCount = 12;
    const hashedPassword = await bcrypt.hash(password, saltCount);
    const hashedEmail = await bcrypt.hash(email, saltCount)

    try {
        if (req.user.username === username || req.user.isAdmin) {
            const updatedUser = await updateUser(req.user.id, newUsername, hashedPassword, hashedEmail);
            console.log(updatedUser);
            res.send(updatedUser);
        } else {
            res.status(500).send({ message: 'Unable to update user.' })
        }
    } catch (error) {
        res.send(error);
    }
});


//purpose -- for admin to fetch all user data
usersRouter.get("/" , async (req,res) => {
    const {isAdmin} = req.user;
    try {
        if(!isAdmin) {
            res.send({message : "You are not authorized to request this data"}).status(401)
        } else {
            const users = await getAllUsers();

            res.send(users)
        }
    } catch (error) {
        res.send(error)
    }
})

usersRouter.delete("/:userID", async (req,res) => {
    const {userID} = req.params
    const {isAdmin} = req.user;
    try {
        if(!isAdmin) {
            res.send({message : "You are not authorized to request this data"}).status(401)
        } else {
            const user = await deleteUser(userID);

            res.send(user)
        }
    } catch (error) {
        res.send(error)
    }
})

//allow admin to change user data
usersRouter.patch("/:userID/admin", async(req,res) => {
    const {username, email, password, userID} = req.body
    const {isAdmin} = req.user;
    try {
        if(!isAdmin) {
            res.send({message : "You are not authorized to request this data"}).status(401)
        }else {
            const saltCount = 12;
            const hashedPassword = await bcrypt.hash(password, saltCount);
            const hashedEmail = await bcrypt.hash(email, saltCount)
            const updatedUser = await updateUser(userID, username, hashedPassword, hashedEmail);
            console.log(updatedUser);
            res.send(updatedUser);
        }
    } catch (error) {
        res.send(error)
    }
})



// EXPORTING the route handler.
module.exports = usersRouter;