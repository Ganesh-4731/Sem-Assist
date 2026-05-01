const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    subject:      { type: String, required: true },
    title:        { type: String, required: true },
    description:  { type: String, default: '' },
    dueDateMillis:{ type: Number, required: true },
    isCompleted:  { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);