import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

// 2. create store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
// 3. export
export default store;
