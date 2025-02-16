const db = require('../db');


const SafariGroup = {
    getAll: async() => {
        return db.any(
            `SELECT * FROM safari_groups`
        );
    },

    getByID: async (id) => {
        return db.
        oneOrNone(
            'SELECT * FROM safari_groups WHERE id = $1', [id]
        );
    },

    create: async (name, description )=>{
        return db.none(
            'INSERT INTO safari_groups(name, description) VALUES($1, $2)', [name, description]);
        
    },

    update: async(id, name, description) => {
        return db.none(
            'UPDATE safari_groups SET name = $1, description = $2 WHERE id = $3', [name, description, id]);
    },

    delete: async (id) => {
        return db.none(
            'DELETE FROM safari_groups WHERE id = $1', [id]);
        
    }

};

module.exports = SafariGroup;