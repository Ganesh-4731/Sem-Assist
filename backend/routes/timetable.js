const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');
const defaultTimetable = require('../data/defaultTimetable');

// GET all timetable entries
router.get('/', async (req, res) => {
    try {
        let entries = await Timetable.find().sort({ dayOfWeek: 1, period: 1 });
        // Seed default if DB is empty
        if (entries.length === 0) {
            await Timetable.insertMany(defaultTimetable);
            entries = await Timetable.find().sort({ dayOfWeek: 1, period: 1 });
        }
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET by day
router.get('/day/:day', async (req, res) => {
    try {
        const entries = await Timetable.find({ dayOfWeek: Number(req.params.day) })
            .sort({ period: 1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST add/update a class
router.post('/', async (req, res) => {
    try {
        const { dayOfWeek, period, subject, room, lecturer } = req.body;
        const existing = await Timetable.findOne({ dayOfWeek, period });
        if (existing) {
            existing.subject  = subject;
            existing.room     = room;
            existing.lecturer = lecturer;
            await existing.save();
            return res.json(existing);
        }
        const entry = new Timetable({ dayOfWeek, period, subject, room, lecturer });
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a class
router.delete('/:id', async (req, res) => {
    try {
        await Timetable.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST reset to default
router.post('/reset', async (req, res) => {
    try {
        await Timetable.deleteMany({});
        await Timetable.insertMany(defaultTimetable);
        const entries = await Timetable.find().sort({ dayOfWeek: 1, period: 1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;