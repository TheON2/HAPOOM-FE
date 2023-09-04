import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  update: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
});

export const {} = postSlice.actions;

export default postSlice.reducer;
