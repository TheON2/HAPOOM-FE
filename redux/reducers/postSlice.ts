import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  update: false,
  updateId: '1',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    TOGGLE_UPDATE: (state) => {
      state.update = !state.update;
    },
    SET_UPDATEID: (state, action: PayloadAction<string>) => {
      state.updateId = action.payload;
    },
  },
});

export const { TOGGLE_UPDATE, SET_UPDATEID } = postSlice.actions;

export default postSlice.reducer;
