const db = require('../db');  // Ensure this is your correct DB connection instance

const Attendance = {
    // Get all attendance records
    getAll: async () => {
        try {
            return await db.any('SELECT * FROM attendance ORDER BY date_time DESC');
        } catch (error) {
            throw new Error('Error fetching attendance');
        }
    },

    // Get attendance by ID
    getById: async (id) => {
        try {
            return await db.oneOrNone('SELECT * FROM attendance WHERE id = $1', [id]);
        } catch (error) {
            throw new Error('Error fetching attendance by ID');
        }
    },

    // Create a new attendance record
    create: async (date_time, location, member_id, status, justification, attended_by, remarks) => {
        try {
            return await db.none(
                'INSERT INTO attendance (date_time, location, member_id, status, justification, attended_by, remarks) ' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [date_time, location, member_id, status, justification, attended_by, remarks]
            );
        } catch (error) {
            throw new Error('Error creating attendance');
        }
    },

    // Update attendance by ID
    update: async (id, date_time, location, status, justification, attended_by, remarks) => {
        try {
            return await db.none(
                'UPDATE attendance SET date_time = $1, location = $2, status = $3, justification = $4, ' +
                'attended_by = $5, remarks = $6 WHERE id = $7',
                [date_time, location, status, justification, attended_by, remarks, id]
            );
        } catch (error) {
            throw new Error('Error updating attendance');
        }
    },

    // Delete attendance by ID
    delete: async (id) => {
        try {
            return await db.none('DELETE FROM attendance WHERE id = $1', [id]);
        } catch (error) {
            throw new Error('Error deleting attendance');
        }
    }
};

module.exports = Attendance;

