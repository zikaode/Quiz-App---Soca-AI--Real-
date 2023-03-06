const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quiz_id: mongoose.Types.ObjectId,
    question: String,
    answer: [String],
    correct_answer: Number,
})

module.exports = mongoose.model('question', questionSchema);