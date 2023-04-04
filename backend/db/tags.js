// IMPORTING the client
const client = require('./client');

// tags FUNCTIONS

async function createTag(name) {
    try {
        const { rows: [tag] } = await client.query(`
      INSERT INTO tags(name) 
      VALUES ($1)
      RETURNING *;
      `, [name]);

        return tag;
    } catch (error) {
        throw error;
    };
};

async function getAllTags() {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM tags;
        `);

        return rows
    } catch (error) {
        throw error;
    }
}

async function deleteTag(id) {
    try {
        console.log("DB", id);
        await client.query(`
            DELETE FROM tags
            WHERE id=$1;
        `, [id]);

        return `DELETED TAG NUMBER: ${id}`
    } catch (error) {
        next(error);
    };
};

async function getTagByName(name) {
    try {
        const { rows: [tag] } = await client.query(`
      SELECT *
      FROM tags
      WHERE name=$1;
      `, [name]);

        if (!tag) {
            throw {
                name: "TagNotFoundError",
                message: "Could not find a Tag with that name!"
            };
        };
        return tag;
    } catch (error) {
        throw error;
    };
};

async function getTagById(id) {
    try {
        const { rows: [tag] } = await client.query(`
      SELECT *
      FROM tags
      WHERE id=$1;
      `, [id]);

        if (!tag) {
            throw {
                name: "TagNotFoundError",
                message: "Could not find a Tag with that ID!"
            };
        };
        return tag;
    } catch (error) {
        throw error;
    };
};

// EXPORTING the tags functions.

module.exports = {
    createTag,
    getAllTags,
    deleteTag,
    getTagByName,
    getTagById
}