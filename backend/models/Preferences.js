const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    studentName:  { type: String, default: '' },
    sectionName:  { type: String, default: 'Section-20' },
    roomName:     { type: String, default: 'N-408' },
    darkMode:     { type: Boolean, default: false },
    accentColor:  { type: String, default: 'Purple' },
    notifEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Preferences', preferencesSchema);