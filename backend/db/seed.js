const { async } = require("q");
const client = require("./client")
const {createVinyl, getAllVinyls, getVinylByTitle, getVinylsByTagName, addTagToVinyl, getVinylsByArtist, getVinylsByTagID, createUser, createTag} = require("./index")

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
            "userID" INTEGER REFERENCES users(id),
            status VARCHAR(255) DEFAULT 'pending'
        );`);

        await client.query(`
        CREATE TABLE order_products (
            id SERIAL PRIMARY KEY,
            "orderID" INTEGER REFERENCES orders(id),
            "vinylID" INTEGER REFERENCES vinyls(id),
            quantity INTEGER NOT NULL DEFAULT 1,
            UNIQUE ("orderID", "vinylID")
        );`);
        
    } catch (error) {
        console.log(error)
    }
    
}

async function makeAdmins() {
    try {
        client.query(`
        UPDATE users
        SET "isAdmin" = true
        WHERE id < 4;
        `)        
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
        await makeAdmins();
        await client.query(
        // INSERT INTO users(username, password, email, "isAdmin") 
        // VALUES ('chasetest', 'chasetest', 'chase@chase.com', true), ('davidtest', 'davidtest', 'david@david.com', true), ('jacobtest', 'jacobtest', 'jacob@jacob.com', true) , ('usertest', 'usertest', 'user@user.com', false);

        `INSERT INTO vinyls(title, artist, price, "yearReleased", "imgURL") 
        VALUES ('Random Access Memories', 'Daft Punk', 2.14, 2013, 'https://img.audiomania.ru/pics/goods/original/d/daft_punk-random_access_memories_2_lp1.jpg'), ('Is This It', 'The Strokes', 1.00, 2001, 'https://img.discogs.com/fnIdn4eIQz6GAIox2btEQRn5O60=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-667892-1249548979.jpeg.jpg'), ('Wide Awake!', 'Parquet Courts', 5.60, 2018, 'https://thefirenote.com/wp-content/uploads/2018/05/ParquetCourts_Wide_Awake_AlbumArt.jpg');

        

        INSERT INTO payments ("userID", address, "CCNum", "cardholderName", "CVVNum") 
        VALUES (1, '123 Street Road', 2349876239846, 'Chase Forlini', 653) , (2, '1826 Lane Street', 239856729385, 'David Kapaku', 234), (3, '908 Circle Court', 3986510131, 'Jacob Boatright', 234), (4, '2324 Road Lane', 1243245545, 'User User', 234); 

        INSERT INTO orders ( "userID", status) 
        VALUES ( 1, 'pending'), ( 2, 'completed'), ( 3, 'inProgress'), (4, 'completed');

        INSERT INTO order_products ("orderID", "vinylID") 
        VALUES (1, 1), (1,2) ,(1,3), (2, 2), (3, 1), (3,3), (4,2);
        `)

        await createVinyl({title: "Hozier", artist: "Hozier", price: "6.99", yearReleased: 2014, imgURL: 'https://img.discogs.com/JEvyddrfD0hdSSEfCA0su5KpF2Q=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6167187-1428283027-5388.jpeg.jpg'})
        await createVinyl({title: "Good Kid, M.A.A.D City", artist: "Kendrick Lamar", price: "7.99", yearReleased: 2012, imgURL: 'https://i.pinimg.com/originals/cf/b7/7a/cfb77a082c0f3b3eb0398c3b694891f8.jpg'})
        await createVinyl({title: "The Eminem Show", artist: "Eminem", price: "5.99", yearReleased: 2002, imgURL: 'https://th.bing.com/th/id/R.0e3f3ca1e91870f78a13be80708d282f?rik=fsdP9SgZbkgtqg&riu=http%3a%2f%2fimages.rapgenius.com%2f54ws9f3gi86oww1er9ieaqitn.1000x1000x1.jpg&ehk=sh8Kc%2fWc9sGKd%2frgyhjsxQ%2fIqnJcvOcsG8LkW4OHt5U%3d&risl=&pid=ImgRaw&r=0'})
        await createVinyl({title: "Dark Side of the Moon", artist: "Pink Floyd", price: "9.99", yearReleased: 1973, imgURL: 'https://le0pard13.files.wordpress.com/2013/08/pink-floyd-dark-side-of-the-moon-album-cover.jpg'})
        await createVinyl({title: "Born in the U.S.A.", artist: "Bruce Springsteen", price: "6.99", yearReleased: 1984, imgURL: 'https://i.pinimg.com/736x/f4/24/12/f424123136d93802c828fca8dc994507.jpg'})
        await createVinyl({title: "Bad", artist: "Michael Jackson", price: "4.99", yearReleased: 1987, imgURL: 'https://th.bing.com/th/id/R.5fbf5f8b7b23b040f863394d83eeeb40?rik=vYSQmi%2fYbjE0Eg&riu=http%3a%2f%2fhiphop-n-more.com%2fwp-content%2fuploads%2f2017%2f02%2fmichael-jackson-bad.jpg&ehk=4Vwl9vnpQFw3yt6wXz6yCxsUXg1wpA0WgSgTI3l8QB4%3d&risl=&pid=ImgRaw&r=0'})
        await createVinyl({title: "Back in Black", artist: "AC/DC", price: "7.99", yearReleased: 1980, imgURL: 'https://i.pinimg.com/originals/06/86/60/068660474366a63e1263e53ff370eb50.jpg'})
        await createVinyl({title: "American Idiot", artist: "Green Day", price: "5.99", yearReleased: 2004, imgURL: 'https://th.bing.com/th/id/OIP.a5CJbFrnb2ybzmUhmA36nQHaHS?pid=ImgDet&rs=1'})
        await createVinyl({title: "25", artist: "Adele", price: "9.99", yearReleased: 2015, imgURL: 'https://theme.visualmodo.com/music/wp-content/uploads/sites/45/2017/12/25_adele_1504764365.jpg'})
        await createVinyl({title: "1989", artist: "Taylor Swift", price: "6.99", yearReleased: 2014, imgURL: 'https://images-na.ssl-images-amazon.com/images/I/91Da6C9HuUL._AC_SL1500_.jpg'})
        await createVinyl({title: "The New Abnormal", artist: "The Strokes", price: "5.99", yearReleased: 2020, imgURL: "https://th.bing.com/th/id/R.75fcd4503e736580f17920cba66e3f06?rik=AzvX1DFN8d0phw&riu=http%3a%2f%2fneirad.org%2fwp-content%2fuploads%2f2020%2f04%2fthe-new-abnormal.jpeg&ehk=chkZT5kI6kvBixvf3VHqpGwfuM%2fHW7m5Rzh3Oxjxgxo%3d&risl=&pid=ImgRaw&r=0"})

        await createVinyl({
        title: "Vampire Weekend",
        artist: "Vampire Weekend",
        price: "9.99",
        yearReleased: 2008,
        imgURL: "https://img.discogs.com/djcA5_IPnTJAfIAvpFHDVf5Z-wU=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1245209-1410561074-5000.jpeg.jpg"
        })
        await createVinyl({
        title: "channel ORANGE",
        artist: "Frank Ocean",
        price: "8.99",
        yearReleased: 2012,
        imgURL: "https://images-na.ssl-images-amazon.com/images/I/51vGncnu2uL._AC_SL1417_.jpg"
        })
        await createVinyl({
        title: "Plastic Beach",
        artist: "Gorillaz",
        price: "12.99",
        yearReleased: 2010,
        imgURL: "https://i.pinimg.com/originals/b6/e4/a3/b6e4a32af267037448fc8c96f5e7900c.jpg"
        })
        await createVinyl({
        title: "Demon Days",
        artist: "Gorillaz",
        price: "9.99",
        yearReleased: 2005,
        imgURL: "https://www.treblezine.com/wp-content/uploads/2017/03/gorillaz-demon-days.jpg"
        })
        await createVinyl({
        title: "Currents",
        artist: "Tame Impala",
        price: "11.99",
        yearReleased: 2015,
        imgURL: "https://img.discogs.com/YTowwwHGojp-7OYH9xvBGk1PR8Q=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7240348-1437277144-6299.jpeg.jpg"
        })
        await createVinyl({title: "Glimpse of Us", artist: "Joji", price:"1.99", yearReleased:2022, imgURL:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Joji_-_Glimpse_of_Us.png/220px-Joji_-_Glimpse_of_Us.png"})
        await createVinyl({title: "lonely",artist: "YUMDDA", price:"3.99", yearReleased:2023, imgURL:"https://i.scdn.co/image/ab67616d00001e023271a8a371fe2bb3120553fc"})
        await createVinyl({title:"Facing Future", artist: "Israel Kamakawiwo'ole", price:"1.99", yearReleased:1993, imgURL:"https://upload.wikimedia.org/wikipedia/en/f/f0/Israel_Kamakawiwo%27ole_Facing_Future.jpg"})
        await createVinyl({title:"Breakthrough", artist:"TWICE", price:"1.99", yearReleased:2019, imgURL:"https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Twice_-_Breakthrough.png/220px-Twice_-_Breakthrough.png"})
        await createVinyl({title: "Good Humor", artist: "Saint Etienne", price: "7.99", yearReleased: 1998, imgURL: "https://upload.wikimedia.org/wikipedia/en/1/16/Saint_Etienne_-_Good_Humor.png"})
        await createVinyl({title: "Supergott (Speedy Mixes) ", artist: "Caramella Girls", price: "12.50", yearReleased: 2008, imgURL: "https://i.scdn.co/image/ab67616d0000b27339a6368dd1efeaea760d1d46"})
        await createVinyl({title: "DiscO-Zone", artist: "O-Zone", price: "14.99", yearReleased: 2002, imgURL: "https://i.scdn.co/image/ab67616d0000b273cef3cb3cd725af3d689bea2e"})
        await createVinyl({title: "Vespertine", artist: "Björk", price: "10.25", yearReleased: 2001, imgURL: "https://shop.bjork.com/wp-content/uploads/2020/07/TPLP101.jpg"})
        await createVinyl({title: "A Moon Shaped Pool", artist: "Radiohead", price: "20.00", yearReleased: 2016, imgURL: "https://rovimusic.rovicorp.com/image.jpg?c=042CKio_tgHmWs_Uis-U1YAf7E_1E-2MlBBPmPAXRBU=&f=3"})
        await createVinyl({title: "A Love Supreme", artist: "John Coltrane", price: "12.99", yearReleased: 1965, imgURL: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61ffflzj4xL._UF1000,1000_QL80_.jpg"})
        await createVinyl({title: "Time Out", artist: "Dave Brubeck Quartet", price: "8.99", yearReleased: 1959, imgURL: "https://upload.wikimedia.org/wikipedia/en/e/e5/Time_out_album_cover.jpg"})
        await createVinyl({title: "The Shape of Jazz to Come", artist: "Ornette Coleman", price: "14.99", yearReleased: 1959, imgURL: "https://upload.wikimedia.org/wikipedia/en/c/c9/ShapeOfJazzToCome.jpg"})
        await createVinyl({title: "Giant Steps", artist: "John Coltrane", price: "11.99", yearReleased: 1960, imgURL: "https://upload.wikimedia.org/wikipedia/en/2/2a/Coltrane_Giant_Steps.jpg"})
        await createVinyl({title: "Bitches Brew", artist: "Miles Davis", price: "10.99", yearReleased: 1969, imgURL: "https://upload.wikimedia.org/wikipedia/en/7/72/Bitches_brew.jpg"})

        await createTag('Rock')
        await createTag('Pop')
        await createTag('Punk')
        await createTag('Electronic')
        await createTag('Rap')
        await createTag('Indie')
        await createTag('Jazz')
        await createTag('K-Pop')
        await createTag('R&B')
        await createTag('Featured')

        await addTagToVinyl('Hozier', 'Indie')
        await addTagToVinyl('Hozier', 'Rock')
        await addTagToVinyl('Random Access Memories' , 'Electronic')
        await addTagToVinyl('Is This It', 'Rock')
        await addTagToVinyl('Is This It', 'Indie') 
        await addTagToVinyl('Wide Awake!', 'Indie')
        await addTagToVinyl('Wide Awake!', 'Rock')
        await addTagToVinyl('Good Kid, M.A.A.D City', 'Rap')
        await addTagToVinyl('The Eminem Show', 'Rap')
        await addTagToVinyl('Dark Side of the Moon', 'Rock')
        await addTagToVinyl("Born in the U.S.A.", 'Rock')
        await addTagToVinyl("Bad", "Pop")
        await addTagToVinyl("Bad", "R&B")
        await addTagToVinyl("Back in Black", "Rock")
        await addTagToVinyl("American Idiot", "Rock")
        await addTagToVinyl("25", "Pop")
        await addTagToVinyl("1989", "Pop")
        await addTagToVinyl("The New Abnormal", "Rock")
        await addTagToVinyl("The New Abnormal", "Indie")

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

        // const allVinyls = await getAllVinyls();
        // console.log(allVinyls)

        const glassAnimals = await createVinyl({title: "How to Be a Human Being", artist: "Glass Animals", price: "5.65", yearReleased: 2016, imgURL: 'https://www.semmstore.com/wp-content/uploads/2016/10/GLASS-ANIMALS-How-To-Be-A-Human-Being-cd-lp-vinile-vinyl-semmstore.com-semm-semmmusic-record-store-music-store-semmstore.jpg'})
        console.log(glassAnimals)

        const isThisIt = await getVinylByTitle("Is This It")
        console.log(isThisIt)

        // const rock = await getVinylsByTagName('rock')
        // console.log(rock)

        // const newVinylTag = await addTagToVinyl(1,4)
        // console.log(newVinylTag)

        const parquet = await getVinylsByArtist("Parquet Courts")
        console.log(parquet)

        client.end()

    } catch (error) {
        console.log(error)
    }
}

buildDB();