// IMPORTING the client
const client = require('./client');

// vinyl FUNCTIONS

async function createVinyl({title, artist, price, yearReleased, imgURL}) {
    try {

        if(imgURL) {
            const {rows : [vinyl]} = await client.query(`
            INSERT INTO vinyls(title, artist, price, "yearReleased", "imgURL")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,[title, artist, price, yearReleased, imgURL])

            return vinyl
        }else {
            const {rows : [vinyl]} = await client.query(`
            INSERT INTO vinyls(title, artist, price, "yearReleased")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,[title, artist, price, yearReleased])

            return vinyl
        }

    } catch (error) {
        throw error
    }
}

async function getAllVinyls() {
    try {
        const {rows: ids} = await client.query(`
        SELECT id FROM vinyls;
        `);
        
        const vinyls = await Promise.all(ids.map(
            vinyl => getVinylByID(vinyl.id)
        ));


        return vinyls;
    } catch (error) {
        throw error
    }
}

async function getVinylByTitle(title) {
    try {
        const {rows : [id]} = await client.query(`
        SELECT id FROM vinyls
        WHERE title = $1;
        `,[title])

        const vinyl = await getVinylByID(parseInt(id.id));


        return vinyl
    } catch (error) {
        throw error
    }
}

async function getVinylsByArtist(artist) {
    try {
        const {rows : ids} = await client.query(`
        SELECT id FROM vinyls
        WHERE artist = $1;
        `,[artist])

        const vinyls = await Promise.all(ids.map(
            vinyl => getVinylByID(vinyl.id)
        ));

        return vinyls;
    } catch (error) {
        throw error
    }
}

async function getVinylByID(id) {
    try {
        const {rows : [vinyl]} = await client.query(`
        SELECT * FROM vinyls
        WHERE id = $1;
        `, [id])

        const {rows} = await client.query(`
        SELECT tags.name FROM tags
        JOIN vinyl_tags on tags.id = vinyl_tags."tagID"
        WHERE "vinylID" = $1;
        `,[vinyl.id])


       const tags = []; //add tags to vinyls
       for(let i = 0; i < rows.length; i ++) {
        tags.push(rows[i].name)
       }

        vinyl.tags = tags;

        return vinyl;
    } catch (error) {
        throw error
    }
}

async function getVinylsByTagName (tagName) {
    try {
        const {rows : vinylIds} = await client.query(`
        SELECT "vinylID" FROM vinyl_tags
        JOIN vinyls ON vinyls.id = vinyl_tags."vinylID"
        JOIN tags ON tags.id = vinyl_tags."tagID"
        WHERE tags.name = $1;
        `,[tagName])

        console.log(vinylIds)

        const vinyls = await Promise.all(vinylIds.map(
            vinylId => getVinylByID(vinylId.vinylID)
        ))

        return vinyls;
    } catch (error) {
        throw(error);
    }
}

async function getVinylsByTagID (tagID) {
    try {
        const {rows: ids} = await client.query(`
        SELECT "vinylID" FROM vinyl_tags
        WHERE "tagID" = $1
        `,[tagID])
        
        const vinyls = await Promise.all(ids.map(
            id => getVinylByID(id.vinylID)
        ))

        return vinyls;
    } catch (error) {
        throw error
    }
}

async function addTagToVinyl (tagID, vinylID) {
    try {
        const {rows : [vinylTag]} = await client.query(`
        INSERT INTO "vinyl_tags"("tagID", "vinylID")
        VALUES ($1, $2)
        RETURNING *;
        `,[tagID, vinylID])      


        const vinyl = await getVinylByID(vinylID)
        
        return vinyl;
    } catch (error) {
        throw error
    }
}

async function removeTagFromVinyl (tagID, vinylID) {
    try {
        const {rows: [tag]} = await client.query(`
        SELECT name FROM tags
        WHERE id = $1;
        `, [tagID])

        await client.query(`
        DELETE FROM vinyl_tags
        WHERE "vinylID" = $1 AND "tagID" = $2; 
        `,[vinylID, tagID])

        const vinyl = await getVinylByID(vinylID);

        vinyl.removedTag = tag.name

        return vinyl        
    } catch (error) {
        throw error;
    }
}


async function updateVinyl({id, title, artist, price, yearReleased, imgURL}) {
    try {
        const {rows: [vinyl]} = await client.query(`
        UPDATE vinyls 
        SET title = $1, artist = $2, price = $3, "yearReleased" = $4, "imgURL" = $5
        WHERE id  = ${id}
        RETURNING *;
        `,[title, artist, price, yearReleased, imgURL])

        return vinyl;
    } catch (error) {
        throw error
    }
}

async function deleteVinyl(id) {
    try {
        console.log("fetching vinyl")
        const vinyl = await getVinylByID(id)

        console.log("staring to delete vinyl...")
        await client.query(`
        DELETE FROM vinyls 
        WHERE id = $1;
        `,[id])
        console.log("deleted vinyl, starting to delete tags...")
        await client.query(`
        DELETE FROM vinyl_tags
        WHERE "vinylID" = $1;       
        `,[id])
        console.log("deleted tags")
        return vinyl;
    } catch (error) {
        throw error
    }
}

// EXPORTING the vinyl functions.

module.exports = {
    createVinyl,
    updateVinyl,
    deleteVinyl,
    getAllVinyls,
    getVinylByTitle,
    getVinylsByTagName,
    addTagToVinyl,
    removeTagFromVinyl,
    getVinylByID,
    getVinylsByArtist,
    getVinylsByTagID
}