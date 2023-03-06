import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increement(state, action) { state.value++ },
        decreement(state, action) { state.value-- },
        addBy(state, action) { state.value += action.payload }
    },
});
export const actions = counterSlice.actions;
export default counterSlice;
