import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string | null;
}

const initialState: NotificationState = {
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    ADD_NOTIFICATION: (state, action: PayloadAction<string>) => {
      console.log('알람옴');
      state.message = action.payload;
    },
    CLEAR_NOTIFICATION: (state) => {
      state.message = null;
    },
  },
});

export const { ADD_NOTIFICATION, CLEAR_NOTIFICATION } =
  notificationSlice.actions;

export default notificationSlice.reducer;
