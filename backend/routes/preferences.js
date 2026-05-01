const express = require('express');
const router = express.Router();
const Preferences = require('../models/Preferences');

// GET preferences (always one document)
router.get('/', async (req, res) => {
    try {
        let prefs = await Preferences.findOne();
        if (!prefs) {
            prefs = await new Preferences({}).save();
        }
        res.json(prefs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH update preferences
router.patch('/', async (req, res) => {
    try {
        let prefs = await Preferences.findOne();
        if (!prefs) prefs = new Preferences({});
        Object.assign(prefs, req.body);
        await prefs.save();
        res.json(prefs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;