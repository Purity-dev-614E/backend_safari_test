const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authmiddleware');
const Attendance = require('../models/attendancemodel');

// Get all attendance records
router.get('/', authenticateToken, authorizeRoles('admin', 'superadmin'),async (req, res) => {
    try {
        const attendance = await Attendance.getAll();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
    }
});

// Get attendance by ID
router.get('/:id', authenticateToken, authorizeRoles('admin','superadmin'), async (req, res) => {
    const { id } = req.params;
    try {
        const attendance = await Attendance.getById(id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance by ID', error: error.message });
    }
});

// Create new attendance record
router.post('/',authenticateToken, async (req, res) => {
    const { date_time, location, member_id, status, justification, attended_by, remarks } = req.body;
    try {
        await Attendance.create(date_time, location, member_id, status, justification, attended_by, remarks);
        res.status(201).json({ message: 'Attendance record created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating attendance record', error: error.message });
    }
});

// Update attendance record by ID
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { date_time, location, status, justification, attended_by, remarks } = req.body;
    try {
        await Attendance.update(id, date_time, location, status, justification, attended_by, remarks);
        res.json({ message: 'Attendance record updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance record', error: error.message });
    }
});

// Delete attendance record by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await Attendance.delete(id);
        res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance record', error: error.message });
    }
});

module.exports = router;
