const client = require("./client")
const {createVinyl, getAllVinyls, getVinylByTitle, getVinylsByTagName, addTagToVinyl, getVinylsByArtist, getVinylsByTagID, createUser} = require("./index")

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
            "yearReleased" INTEGER NOT NULL,
            "imgURL" TEXT DEFAULT 'https://pngimg.com/uploads/vinyl/vinyl_PNG21.png'
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
            "CCNum" VARCHAR(255) NOT NULL,
            "cardholderName" VARCHAR(255) NOT NULL,
            "CVVNum" VARCHAR(255) NOT NULL
        );`);

        await client.query(`
         CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "paymentID" INTEGER REFERENCES payments(id),
            "userID" INTEGER REFERENCES users(id),
            status VARCHAR(255) DEFAULT 'pending'
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
        await createUser({username: 'chasetest', password: 'chasetest', email: 'chase@chase.com'})
        await createUser({username: 'davidtest', password: 'davidtest', email: 'david@david.com'})
        await createUser({username: 'jacobtest',password: 'jacobtest', email:'jacob@jacob.com'})
        await createUser({username: 'usertest', password: 'usertest',email: 'user@user.com'})
        await client.query(
        // INSERT INTO users(username, password, email, "isAdmin") 
        // VALUES ('chasetest', 'chasetest', 'chase@chase.com', true), ('davidtest', 'davidtest', 'david@david.com', true), ('jacobtest', 'jacobtest', 'jacob@jacob.com', true) , ('usertest', 'usertest', 'user@user.com', false);

        `INSERT INTO vinyls(title, artist, price, "yearReleased", "imgURL") 
        VALUES ('Random Access Memories', 'Daft Punk', 2.14, 2013, 'https://img.audiomania.ru/pics/goods/original/d/daft_punk-random_access_memories_2_lp1.jpg'), ('Is This It', 'The Strokes', 1.00, 2001, 'https://img.discogs.com/fnIdn4eIQz6GAIox2btEQRn5O60=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-667892-1249548979.jpeg.jpg'), ('Wide Awake!', 'Parquet Courts', 5.60, 2018, 'https://thefirenote.com/wp-content/uploads/2018/05/ParquetCourts_Wide_Awake_AlbumArt.jpg');

        INSERT INTO tags(name)
        VALUES ('rock'), ('indie'), ('electronic'), ('alternative'), ('rap'), ('pop'), ('punk');

        INSERT INTO vinyl_tags("vinylID", "tagID")
        VALUES (1, 3), (1, 6), (2,1), (2, 2), (3, 1), (3, 2), (3, 7);

        INSERT INTO payments ("userID", address, "CCNum", "cardholderName", "CVVNum") 
        VALUES (1, '123 Street Road', 2349876239846, 'Chase Forlini', 653) , (2, '1826 Lane Street', 239856729385, 'David Kapaku', 234), (3, '908 Circle Court', 3986510131, 'Jacob Boatright', 234), (4, '2324 Road Lane', 1243245545, 'User User', 234); 

        INSERT INTO orders ("paymentID", "userID", status) 
        VALUES (1, 1, 'pending'), (2, 2, 'completed'), (3, 3, 'inProgress'), (4 ,4, 'completed');

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

        const allVinyls = await getAllVinyls();
        console.log(allVinyls)

        const glassAnimals = await createVinyl({title: "How to Be a Human Being", artist: "Glass Animals", price: "5.65", yearReleased: 2016, imgURL: 'https://www.semmstore.com/wp-content/uploads/2016/10/GLASS-ANIMALS-How-To-Be-A-Human-Being-cd-lp-vinile-vinyl-semmstore.com-semm-semmmusic-record-store-music-store-semmstore.jpg'})
        console.log(glassAnimals)

        const isThisIt = await getVinylByTitle("Is This It")
        console.log(isThisIt)

        const rock = await getVinylsByTagName('rock')
        console.log(rock)

        const newVinylTag = await addTagToVinyl(1,4)
        console.log(newVinylTag)

        const parquet = await getVinylsByArtist("Parquet Courts")
        console.log(parquet)

        client.end()

    } catch (error) {
        console.log(error)
    }
}

buildDB();