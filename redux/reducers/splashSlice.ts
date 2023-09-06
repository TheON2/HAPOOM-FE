import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface splashState {
  isStart: boolean;
}

const initialState: splashState = {
  isStart: false,
};

const splashSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    START_TRUE: (state, action: PayloadAction<any>) => {
      state.isStart = action.payload;
    },
  },
});

export const { START_TRUE } = splashSlice.actions;

export default splashSlice.reducer;
