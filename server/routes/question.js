const express = require('express');
const router = express.Router();
const Quizzes = require('../model/quizzes');
const Question = require('../model/question');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;

const validateObjectId = (id) => ObjectId.isValid(id) && (new
    ObjectId(id)).toString() === id

router.get('/', async (req, res) => {
    try {
        const question = await Question.find()
        if (!question) return res.status(404).json({ massage: "question Not Found" })
        res.json(question)
    } catch (error) {
        res.json({ massage: `Error Pada Server ${error.massage}` })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
        if (!question) return res.status(404).json({ massage: "question Not Found" })
        res.json(question)
    } catch (error) {
        res.json({ massage: `Error Pada Server ${error.massage}` })
    }
});

router.get('/on/:id', async (req, res) => {
    try {
        const question = await Question.find({ quiz_id: req.params.id })
        if (!question) return res.status(404).json({ massage: "question Not Found" })
        res.json(question)
    } catch (error) {
        res.json({ massage: `Error Pada Server ${error.massage}` })
    }
});

router.post('/', async (req, res) => {
    const question = new Question({
        quiz_id: req.body.quiz_id,
        question: req.body.question,
        answer: [...req.body.answer],
        correct_answer: req.body.correct_answer,
    })
    try {
        const result = await question.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ massage: `Error has Occure in ${error.massage}` })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (req.body.quiz_id != null) {
            question.quiz_id = req.body.quiz_id
        }
        if (req.body.question != null) {
            question.question = req.body.question
        }
        if (req.body.answer != null) {
            question.answer = [
                ...req.body.score
            ]
        }
        if (req.body.correct_answer != null) {
            question.correct_answer = req.body.correct_answer
        }
        const questionEdited = await question.save()
        res.json(questionEdited)
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: `Terjadi Kelasahan Pada Server ${error}` })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ massage: `Question Not Found!` })
        }
        question.delete()
        res.json({ massage: `Question Berhasil Didelete` })
    } catch (error) {
        res.status(500).json({ massage: `Terjadi Kelasahan Pada Server` })
    }
})

module.exports = router;