require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => console.log("Connected Successfully..."))
    .catch((error) => console.log(error));
app.use(express.json());
app.use(cors());
const userRouter = require('./routes/user');
const quizRouter = require('./routes/quiz');
const quizHistoryRouter = require('./routes/quiz_history');
const questionRouter = require('./routes/question');
app.use('/user', userRouter);
app.use('/quiz', quizRouter);
app.use('/quiz_history', quizHistoryRouter);
app.use('/question', questionRouter);

app.listen('8000', () => console.log('Server Active'))