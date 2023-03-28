const client = require("./client")

async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS vinyl_tags;
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS payments;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS vinyls;
        DROP TABLE IF EXISTS users;
        `)
    } catch (error) {
        console.log(error)
    }
    
}

async function buildTables() {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
        );
        `);

        await client.query(`
        CREATE TABLE vinyls (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
            price DECIMAL NOT NULL,
            yearReleased INTEGER NOT NULL
        );
        `);

        await client.query(`
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );`);

        await client.query(` 
        CREATE TABLE vinyl_tags (
            id SERIAL PRIMARY KEY,
            "vinylID" INTEGER REFERENCES vinyls(id),
            "tagID" INTEGER REFERENCES tags(id),
            UNIQUE("vinylID", "tagID")
        );`);

        await client.query(`
        CREATE TABLE payments (
            id SERIAL PRIMARY KEY,
            "userID" INTEGER REFERENCES users(id),
            address VARCHAR(255) NOT NULL,
            "CCNum" VARCHAR(255) NOT NULL
        );`);

        await client.query(`
         CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "paymentID" INTEGER REFERENCES payments(id),
            "userID" INTEGER REFERENCES users(id),
            completed BOOLEAN DEFAULT false
        );`);

        await client.query(`
        CREATE TABLE order_products (
            id SERIAL PRIMARY KEY,
            "orderID" INTEGER REFERENCES orders(id),
            "vinylID" INTEGER REFERENCES vinyls(id)
        );`);
        
    } catch (error) {
        console.log(error)
    }
    
}

async function seedDB() {
    try {
        await client.query(`
        INSERT INTO users(username, password, email, "isAdmin") 
        VALUES ('chase', 'chase', 'chase@chase.com', true), ('david', 'david', 'david@david.com', true), ('jacob', 'jacob', 'jacob@jacob.com', true) , ('user', 'user', 'user@user.com', false);

        INSERT INTO vinyls(title, artist, price, yearReleased) 
        VALUES ('Random Access Memories', 'Daft Punk', 2.14, 2013), ('Is This It', 'The Strokes', 1.00, 2001), ('Wide Awake!', 'Parquet Courts', 5.60, 2018);

        INSERT INTO tags(name)
        VALUES ('rock'), ('indie'), ('electronic'), ('alternative'), ('rap'), ('pop'), ('punk');

        INSERT INTO vinyl_tags("vinylID", "tagID")
        VALUES (1, 3), (1, 6), (2,1), (2, 2), (3, 1), (3, 2), (3, 7);

        INSERT INTO payments ("userID", address, "CCNum") 
        VALUES (1, '123 Street Road', 2349876239846) , (2, '1826 Lane Street', 239856729385), (3, '908 Circle Court', 3986510131), (4, '2324 Road Lane', 1243245545); 

        INSERT INTO orders ("paymentID", "userID", completed) 
        VALUES (1, 1, false), (2, 2, false), (3, 3, true), (4 ,4, true);

        INSERT INTO order_products ("orderID", "vinylID") 
        VALUES (1, 1), (1,2) ,(1,3), (2, 2), (3, 1), (3,3), (4,2);
        `)
    } catch (error) {
        console.log(error)
    }
    
}

async function buildDB() {
    try {

        client.connect();

        await dropTables();
        await buildTables();
        await seedDB();

        client.end()

    } catch (error) {
        console.log(error)
    }
}

buildDB();