//route for safari group
const express = require('express');
const router = express.Router();
const SafariGroup = require('../models/safarigroupmodel');
const { authenticateToken, authorizeRoles } = require('../middleware/authmiddleware');


//Get all Groups
router.get('/', authenticateToken, authorizeRoles('superadmin'),async (req, res) => {
    try {
        const groups = await SafariGroup.getAll();
        res.json(groups);
    }catch(error){
        res.status(500).json({ error : 'Failed to fetch groups'});
    }
});

//get group by id
router.get('/:id',  authenticateToken, authorizeRoles('superadmin'), async (req, res) => {
    const { id } = req.params;
    try {
        const group = await SafariGroup.getByID(id);
        if(!group){
            return res.status(404).json({ error : 'Group not found'});
        }
        res.json(group);
    }catch(error){
        res.status(500).json({ error : 'Failed to fetch group'});
    }
});

//create a new group
router.post('/',  authenticateToken, authorizeRoles('superadmin'), async (req, res) => {
    const { name, description } = req.body
    try {
        await SafariGroup.create(name, description);
        res.status(200).json({ message : 'Group created successfully' });
    } catch (error){
        res.status(500).json({ error : 'Failed to create group' });
    }
});

//update a group
router.put('/:id',  authenticateToken, authorizeRoles('superadmin'), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await SafariGroup.update(id, name, description);
        res.json({ message : 'Group updated successfully' });
    } catch (error) {
        res.status(500).json({ error : 'Failed to update group' });
    }
});

//delete a group
router.delete('/:id',  authenticateToken, authorizeRoles('superadmin'), async (req, res) => {
    const { id } = req.params;
    try {
        await SafariGroup.delete(id);
        res.json({ message : 'Group deleted successfully' });
    } catch (error){
        res.status(500).json({ error : 'Failed to delete group' });
    }
});

module.exports = router;