// IMPORTING the client
const client = require('./client');

// orders FUNCTIONS

async function createOrder(userID) {
    try {
        //find payment for user
        const {rows: [payment]} = await client.query(`
        SELECT * FROM payments
        WHERE "userID" = ${userID};
        `)
        if(!payment){ //check if user has payment info
            return("No payment found for this user")
        } else {
            //create a pending order 
            //status is default pending
            const {rows: [order]} = await client.query(`
            INSERT INTO orders("paymentID", "userID")
            VALUES ($1, $2)
            RETURNING *;
            `,[payment.id, userID])

            return order
        }
    } catch (error) {
        throw error
    }
}

async function getOrderByID(orderID) {
    try {
        //find the order
        const {rows: [order]} = await client.query(`
        SELECT * FROM orders
        WHERE id = $1;
        `,[orderID])

        //add products
        const {rows: products} = await client.query(`
        SELECT vinyls.*, order_products.quantity FROM vinyls
        JOIN order_products on order_products."vinylID" = vinyls.id
        WHERE "orderID" = $1;
        `,[orderID])

        order.products = products;

        return order
    } catch (error) {
        throw error
    }
}

async function getOrdersByUserID(userID) {
    try {
        //select order ids for users orders
        const {rows: ids} = await client.query(`
        SELECT id FROM orders
        WHERE "userID" = $1;
        `,[userID])

        //use getOrderByID to add products to the orders
        const orders = await Promise.all(ids.map(
            order => getOrderByID(order.id)
        ))

        return orders
    } catch (error) {
        throw error
    }
}

async function setOrderStatus(orderID, status) {
    try {
        const {rows} = await client.query(`
        UPDATE orders
        SET status = $1
        WHERE id = ${orderID}
        RETURNING *;        
        `,[status])

        //fetch the updated order
        const order = await getOrderByID(orderID)

        return order
    } catch (error) {
        throw error
    }
}

async function getPendingOrderByUserID(userID) {
    try {
        const {rows: [order]} = await client.query(`
        SELECT * FROM orders
        WHERE "userID" = $1 AND status = 'pending';
        `,[userID])

        const pendingOrder = await getOrderByID(order.id)

        return pendingOrder
    } catch (error) {
        
    }
}

//IDK if this is needed
async function deleteOrders({}) { 
    try {
        
    } catch (error) {
        throw error
    }
}

// EXPORTING the orders functions.

module.exports = {
    createOrder,
    getOrdersByUserID,
    deleteOrders,
    getOrderByID,
    getPendingOrderByUserID,
    setOrderStatus
}