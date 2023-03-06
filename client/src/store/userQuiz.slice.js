import { createSlice } from '@reduxjs/toolkit';

const userQuizSlice = createSlice({
    name: 'userQuiz',
    initialState: { name: "", joinAt: Date.now(), trace: -1, answer: [], total: 0, result: { correct: 0, unCorrect: 0, score: 0, unCheck: 0 }, data: {} },
    reducers: {
        setName(state, action) { state.name = action.payload.name },
        getQuiz(state, action) { state.data = action.payload; state.total = state.data.quiz.length },
        nextQuiz(state, action) { state.trace++; clearTimeout(action.payload) },
        setAnswer(state, action) { state.answer = [...state.answer, action.payload.answer]; console.log(state.answer, state.total) },
        setCorrect(state, action) { state.result.correct++; state.result.score += state.data.score },
        setUnCorrect(state, action) { state.result.unCorrect++ },
        setUnCheck(state, action) { state.result.unCheck++ },
        reset(state, action) { state.name = ''; state.joinAt = Date.now(); state.trace = -1; state.answer = [], state.total = 0, state.result = { correct: 0, unCorrect: 0, score: 0, unCheck: 0 }; state.data = {} }
    },
});
export const actions = userQuizSlice.actions;
export default userQuizSlice;
