import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter.slice';
import userQuizSlice from './userQuiz.slice';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        userQuiz: userQuizSlice.reducer,
    },
});

export default store;