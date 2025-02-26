const db = require('../db');

const Event = {
  //fetch all events
    getAll: async () => {
        return db.any('SELECT * FROM events');
    },

    //fetch event by ID
    getById: async (id) => {
        return db.oneOrNone('SELECT * FROM events WHERE id = $1', [id]);
    },
    //fetch latest event
    getLatest: async () => {
        return db.any('SELECT * FROM events ORDER BY id DESC LIMIT 1');
    },

    //add new event
    create: async (title, description, location, date, time) => {
        return db.none(
            `INSERT INTO events(name, description, location, date, time)
             VALUES($1, $2, $3, $4, $5)`,
            [title, description, location, date, time]
        );
    },

    //update an existing event
    update: async (id, title, description, location, date, time) => {
        return db.none(
            `UPDATE events
             SET name = $1,
                 description = $2,
                 location = $3,
                 date = $4,
                 time = $5
             WHERE id = $6`,
            [title, description, location, date, time, id]
        );
    },

    //delete an event by ID
    delete: async (id) => {
        return db.none('DELETE FROM events WHERE id = $1', [id]);
    },

    //fetch all events by location
    getByLocation: async (location) => {
        return db.any('SELECT * FROM events WHERE location = $1', [location]);
    },

    //fetch all events by date
    getByDate: async (date) => {
        return db.any('SELECT * FROM events WHERE date = $1', [date]);
    },

    //fetch all events by time
    getByTime: async (time) => {
        return db.any('SELECT * FROM events WHERE time = $1', [time]);
    },

    //update event status
    updateStatus: async (id, status) => {
        return db.none(
            `UPDATE events
            SET status = $1
            WHERE id = $2`,
            [status, id]
        );
    }
};