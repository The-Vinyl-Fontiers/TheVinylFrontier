// IMPORTING the client & encrypting / hashing password dependencies.
const client = require("./client");
const bcrypt = require('bcrypt');

// USER FUNCTIONS

// Create a new user.
async function createUser({ username, password, email }) {
    try {
        const saltCount = 12;
        const hashedPassword = await bcrypt.hash(password, saltCount);
        const hashedEmail = await bcrypt.hash(email, saltCount)

        const { rows } = await client.query(`
        INSERT INTO users(username, password, email)
        VALUES($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, hashedPassword, hashedEmail]);

        return rows[0];
    } catch (error) {
        throw error;
    };
};

// Get a specified user by username.
async function getUser({ username, password }) {
    try {
        const { rows } = await client.query(`
      SELECT id, username, password, email, "isAdmin"
      FROM users
      WHERE username = $1;
    `, [username]);

        if (rows.length === 0) {
            throw new Error('User not found');
        }

        const user = rows[0];
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(password, hashedPassword);

        if (!isValid) {
            throw new Error('Invalid password');
        }

        return user;
    } catch (error) {
        throw error;
    };
};

// Get a user by user id.
async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
      SELECT id, username, email, "isAdmin"
      FROM users
      WHERE id=${userId};
  `);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        throw error;
    };
};

// Get a user by username.
async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
    `, [username]);

        return user;
    } catch (error) {
        throw error;
    };
};

async function updateUser(id, username, password, email){
    try {
        const {rows: [user]} = await client.query(`
        UPDATE users
        SET username = $1, password = $2, email = $3
        WHERE id = $4
        RETURNING *;
        `, [username, password, email, id]);
        return user;
    } catch(error){
        throw error;
    };
}


async function makeUserAdmin(userID) {
    try {
        const {rows: [user]} = await client.query(`
        UPDATE users
        SET "isAdmin" = true
        WHERE id = ${userID}
        RETURNING *;
        `)
        
        return user
    } catch (error) {
        throw error
    }
}

// EXPORTING the users functions.

module.exports = {
    updateUser,
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    makeUserAdmin
}