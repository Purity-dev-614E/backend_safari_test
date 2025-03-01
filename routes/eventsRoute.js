const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authmiddleware');
const event = require('../models/eventsmodel');

// Get all events
router.get('/', authenticateToken, authorizeRoles('admin', 'super admin'), async (req, res) => {
    try {
        const events = await Event.getAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});

// Get event by ID
router.get('/:id', authenticateToken, authorizeRoles('admin', 'super admin'), async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.getById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
            }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event by ID', error: error.message });
    }
});

// Create new event
router.post('/', authenticateToken, authorizeRoles('admin', 'super admin'), async (req, res) => {
    const { title, description, date_time, location, organizer, status } = req.body;
    try {
        await Event.create(title, description, date_time, location, organizer, status);
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});

// Update event by ID
router.put('/:id', authenticateToken, authorizeRoles('admin', 'super admin'), async (req, res) => {
    const id = req.params.id;
    const { title, description, date_time, location, organizer, status } = req.body;
    try {
        await Event.update(id, title, description, date_time, location, organizer, status);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});

// Delete event by ID
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'super admin'), async (req, res) => {
    const id = req.params.id;
    try {
        await Event.delete(id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});


//get latest event
router.get('/latest', authenticateToken, async (req, res) => {
    try {
        const event = await Event.getLatest();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest event', error: error.message });
    }
});



//update event status
router.put('/:id/status', authenticateToken, authorizeRoles('admin', 'super admin'), async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    try {
        await Event.updateStatus(id, status);
        res.json({ message: 'Event status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event status', error: error.message });
    }
});

module.exports = router;