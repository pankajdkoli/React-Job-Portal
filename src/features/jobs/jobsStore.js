import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    job: {}
};

export const jobsStore = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJob: (state, action) => {
            state.job = action.payload;
        },
    },
});

export const { setJob } = jobsStore.actions;

export const selectJob = (state) => state.jobs.job;

export default jobsStore.reducer;
