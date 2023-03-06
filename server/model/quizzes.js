const mongoose = require('mongoose');

const quizzesSchema = new mongoose.Schema({
    quizName: { type: String, required: true },
    description: { type: String, required: false },
    score: { type: Number, required: true },
    time: { type: Number, required: true },
})

module.exports = mongoose.model('quizzes', quizzesSchema);