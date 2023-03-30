// IMPORTING the client & encrypting / hashing password dependencies.
const client = require("./client");
const bcrypt = require('bcrypt');

// USER FUNCTIONS

// Create a new user.
async function createPaymentInfo({UserID, Address, CCNum, cardholderName, CVVNum}) {
    try {
        const saltCount = 15;
        const hashedAddress= await bcrypt.hash(Address, saltCount);
        const hashedCCNum= await bcrypt.hash(CCNum, saltCount);
        const hashedCVVNum= await bcrypt.hash(CVVNum, saltCount);

        const { rows } = await client.query(`
        INSERT INTO payments("userID", Address, "CCNum", "cardholderName", "CVVNum")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `, [UserID, hashedAddress, hashedCCNum, cardholderName, hashedCVVNum]);

        return rows[0];
    } catch (error) {
        throw error;
    };
};

async function getCreditCardInfo({id, UserID}) {
    try {
        const { rows } = await client.query(`
        SELECT * 
        FROM payments
        WHERE id = $1 AND "userID" = $2
        RETURNING *;
        `, [id, UserID]);

        return rows;
    } catch (error) {
        throw error;
    }
}


async function updatePaymentInfo({UserID, Address, CCNum, cardholderName, CVVNum}) {
    try {
        const saltCount = 15;
        const hashedAddress= await bcrypt.hash(Address, saltCount);
        const hashedCCNum= await bcrypt.hash(CCNum, saltCount);
        const hashedCVVNum= await bcrypt.hash(CVVNum, saltCount);

        const { rows } = await client.query(`
        UPDATE payments
        SET Address = $1, "CCNum" = $2, "cardholderName" = $3, "CVVNum" = $4
        WHERE "userID" = $5
        RETURNING *;
        `, [hashedAddress, hashedCCNum, cardholderName, hashedCVVNum, UserID]);

        return rows[0];
    } catch (error) {
        throw error;
    };
};


async function deleteCreditCardInfo({id, UserID}) {
    try {
        await client.query(`
        DELETE 
        FROM payments
        WHERE id = $1 AND userID = $2;
        `, [id, UserID]);

        return `DELETED CREDIT CARD INFO ${id}`;
    } catch (error) {
        throw error
    }
}

// EXPORTING the creditCardInfo functions.

module.exports = {
    creteCreditCardInfo,
    getCreditCardInfo,
    updateCreditCardInfo,
    deleteCreditCardInfo,
}