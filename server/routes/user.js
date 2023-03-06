const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;

const validateObjectId = (id) => ObjectId.isValid(id) && (new
    ObjectId(id)).toString() === id

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
});
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});
router.post('/', (req, res) => { });
router.patch('/:id', (req, res) => { });
router.delete('/:id', (req, res) => { });

async function getUser(req, res, next) {
    let user;
    try {
        if (validateObjectId(req.params.id)) {
            user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ massage: `Cannot find User ${req.params.id}` })
        }
        else return res.status(401).json({ massage: `Invalid id for user` })
    } catch (error) {
        console.table(error);
        return res.status(500).json({ massage: error.massage })
    }
    res.user = user;
    next();
}

module.exports = router;