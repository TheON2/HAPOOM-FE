import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  update: false,
  updateId: '10',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleUpdate: (state) => {
      state.update = !state.update;
    },
    setUpdateId: (state, action: PayloadAction<string>) => {
      state.updateId = action.payload;
    },
  },
});

export const { toggleUpdate } = postSlice.actions;

export default postSlice.reducer;
