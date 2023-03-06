const express = require('express');
const router = express.Router();
const Quizzes = require('../model/quizzes');
const Question = require('../model/question');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;

const validateObjectId = (id) => ObjectId.isValid(id) && (new
    ObjectId(id)).toString() === id

router.get('/', async (req, res) => {
    const quizzes = await Quizzes.find();
    res.json(quizzes);
});

router.get('/:id', getQuizzes, (req, res) => {
    let quizzes, question;
    quizzes = JSON.parse(JSON.stringify(res.quizzes));
    question = JSON.parse(JSON.stringify(res.question));
    quizzes.quiz = question;
    res.json(quizzes);
});

router.post('/', async (req, res) => {
    const quiz = new Quizzes({
        quizName: req.body.quizName,
        description: req.body.description,
        score: req.body.score,
        time: req.body.time
    })
    try {
        const result = await quiz.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ massage: `Error has Occure in ${error.massage}` })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const quiz = await Quizzes.findById(req.params.id);
        if (req.body.quizName != null) {
            quiz.quizName = req.body.quizName
        }
        if (req.body.description != null) {
            quiz.description = req.body.description
        }
        if (req.body.score != null) {
            quiz.score = req.body.score
        }
        if (req.body.time != null) {
            quiz.time = req.body.time
        }
        const quizEdited = await quiz.save()
        res.json(quizEdited)
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: `Terjadi Kelasahan Pada Server ${error}` })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const quiz = await Quizzes.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ massage: `Quiz Not Found!` })
        }
        quiz.delete()
        res.json({ massage: `Quiz Berhasil Didelete` })
    } catch (error) {
        res.status(500).json({ massage: `Terjadi Kelasahan Pada Server` })
    }
})

async function getQuizzes(req, res, next) {
    let quizzes, question;
    try {
        if (validateObjectId(req.params.id)) {
            quizzes = await Quizzes.findById(req.params.id);
            question = await Question.find({ quiz_id: req.params.id });
            if (question.length == 0) return res.status(404).json({ massage: `Cannot find Question in Quiz ${req.params.id}` })
            if (!quizzes) return res.status(404).json({ massage: `Cannot find Quizzes ${req.params.id}` })
        }
        else return res.status(422).json({ massage: `Invalid id for Quizzes` })
    } catch (error) {
        console.table(error);
        return res.status(500).json({ massage: error.massage })
    }
    res.quizzes = quizzes;
    res.question = question;
    next();
}

module.exports = router;