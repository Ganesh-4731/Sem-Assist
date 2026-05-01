const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// GET all assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ dueDateMillis: 1 });
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create assignment
router.post('/', async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH update (mark complete/incomplete)
router.patch('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        res.json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE assignment
router.delete('/:id', async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;