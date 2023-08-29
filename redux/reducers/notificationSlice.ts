import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string | null;
  post: any;
}

const initialState: NotificationState = {
  message: null,
  post: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    ADD_NOTIFICATION: (state, action: PayloadAction<string>) => {
      console.log('알람옴');
      state.message = action.payload;
    },
    LOAD_POST: (state, action: PayloadAction<any>) => {
      state.post = action.payload;
    },
    CLEAR_NOTIFICATION: (state) => {
      state.message = null;
    },
  },
});

export const { ADD_NOTIFICATION, CLEAR_NOTIFICATION, LOAD_POST } =
  notificationSlice.actions;

export default notificationSlice.reducer;
