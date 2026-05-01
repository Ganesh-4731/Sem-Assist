const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    dayOfWeek: { type: Number, required: true }, // 1=Mon ... 6=Sat
    period:    { type: Number, required: true },  // 1-7 (>7 = extra)
    subject:   { type: String, required: true },
    room:      { type: String, default: '' },
    lecturer:  { type: String, default: '' }
});

module.exports = mongoose.model('Timetable', timetableSchema);