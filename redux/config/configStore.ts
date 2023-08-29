import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import postReducer from '../reducers/postSlice';
import notificationReducer from '../reducers/notificationSlice';
const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
