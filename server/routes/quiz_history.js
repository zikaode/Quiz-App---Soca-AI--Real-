const express = require('express');
const router = express.Router();
const QuizHistory = require('../model/quiz_history');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;

const validateObjectId = (id) => ObjectId.isValid(id) && (new
    ObjectId(id)).toString() === id

router.get('/', async (req, res) => {
    let quizHistory = await QuizHistory.find().sort({ "score": -1 });
    res.json(quizHistory);
});

router.get('/:id', async (req, res) => {
    let quizHistory = await QuizHistory.find({ quiz_id: req.params.id }).sort({ "score": -1 });
    res.json(quizHistory);
});

router.post('/', async (req, res) => {
    const quizHistory = new QuizHistory({
        quiz_id: req.body.quiz_id,
        username: req.body.username,
        join_at: req.body.join_at,
        answer: {
            correct: req.body.answer.correct,
            uncorrect: req.body.answer.unCorrect,
            detail: [...req.body.answer.detail],
        },
        score: req.body.score
    });
    try {
        const dataHistory = await quizHistory.save();
        let quizRank = await QuizHistory.find().sort({ "score": -1 });
        quizRank = quizRank.findIndex((el) => el._id == dataHistory._id.toString());
        res.json({ data: dataHistory, rank: quizRank });
    } catch (error) {
        res.status(400).json({ massage: `ERROR : ${error.massage}` })
    }
});

module.exports = router;