const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
    quiz_id: mongoose.Types.ObjectId,
    username: String,
    answer: {
        correct: Number,
        uncorrect: Number,
        detail: [Number]
    },
    score: Number,
})

module.exports = mongoose.model('quiz_history', quizHistorySchema);