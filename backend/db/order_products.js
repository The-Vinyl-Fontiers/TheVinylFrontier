// IMPORTING the client
const client = require('./client');
const { getOrderByID } = require('./orders');
const { getVinylByID } = require('./vinyl');

// order_products FUNCTIONS


//adding a product to an order
async function createOrderProduct(orderID, vinylID) {
    try {
        const {rows } = await client.query(`
        INSERT INTO order_products("orderID", "vinylID")
        VALUES ($1, $2)
        RETURNING *;
        `,[orderID, vinylID])

        //fetch the order with the new product attatched 
        const order = await getOrderByID(orderID)

        return order
    } catch (error) {
        throw error
    }
}

async function deleteOrderProduct(orderID, vinylID) {
    try {
        //get removed vinyl so we can add it to return
        const removedVinyl = await getVinylByID(vinylID)
        //remove the tags to clean up the output
        delete removedVinyl.tags

        //remove the order_product
        await client.query(`
        DELETE FROM order_products
        WHERE "orderID" = $1 AND "vinylID" = $2
        `,[orderID, vinylID])
        
        //get the updated order
        const order =  await getOrderByID(orderID)

        //attach deleted order and return
        order.removedVinyl = removedVinyl

        return order
    } catch (error) {
        throw error
    }
}

async function getOrdersProducts({}) {
    try {
        
    } catch (error) {
        throw error
    }
}

async function updateOrdersProducts({}) {
    try {
        
    } catch (error) {
        throw error
    }
}



// EXPORTING the order_products functions.

module.exports = {
    createOrderProduct,
    getOrdersProducts,
    updateOrdersProducts,
    deleteOrderProduct,
}