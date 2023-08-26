import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import postReducer from '../reducers/postSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
