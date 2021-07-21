import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: {}
};

export const companyStore = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companyStore.actions;

export const selectCompany = (state) => state.companies.company;

export default companyStore.reducer;
