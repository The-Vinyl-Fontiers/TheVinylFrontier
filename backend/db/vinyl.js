// IMPORTING the client
const client = require('./client');

// vinyl FUNCTIONS

async function createVinyl({title, artist, price, yearReleased}) {
    try {
        const {rows : [vinyl]} = await client.query(`
        INSERT INTO vinyls(title, artist, price, "yearReleased")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,[title, artist, price, yearReleased])

        return vinyl;
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


       const tags = [];
       for(let i = 0; i < rows.length; i ++) {
        tags.push(rows[i].name)
       }

        vinyl.tags = tags;

        return vinyl;
    } catch (error) {
        throw error
    }
}

async function getVinylsByTags () {

}

async function addTagsToVinyl () {

}

async function delelteTagFromVinyl () {
    
}


async function updateVinyl({}) {
    try {
        
    } catch (error) {
        throw error
    }
}

async function deleteVinyl({}) {
    try {
        
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
    getVinylByTitle
}