// routes/memberRoute.js
const express = require('express');
const router = express.Router();
const Member = require('../models/membersmodel');
const { authenticateToken, authorizeRoles } = require('../middleware/authmiddleware');




// GET all members
router.get('/', authenticateToken , authorizeRoles('admin', 'superadmin'), async (req, res) => {
  try {
    const members = await Member.getAll();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// GET a member by ID
router.get('/:id', authenticateToken, authorizeRoles('admin','superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.getById(id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

// POST create a new member
router.post('/', authenticateToken , authorizeRoles('admin'),async (req, res) => {
  const { name, email, photo, safari_group_id, gender, role, location, nk, nk_contact } = req.body;
  try {
    await Member.create(name, email, photo, safari_group_id, gender, role, location, nk, nk_contact);
    res.status(201).json({ message: 'Member created successfully' });
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

// PUT update an existing member
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  const { id } = req.params;
  const { name, email, photo, safari_group_id, gender, role, location, nk, nk_contact } = req.body;
  try {
    await Member.update(id, name, email, photo, safari_group_id, gender, role, location, nk, nk_contact);
    res.json({ message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// DELETE a member
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    await Member.delete(id);
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

module.exports = router;
