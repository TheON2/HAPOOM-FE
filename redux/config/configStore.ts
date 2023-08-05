import {
  combineReducers,
  configureStore,
  PayloadAction,
  Store,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userReducer from '../reducers/userSlice';
import postReducer from '../reducers/postSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = Parameters<typeof rootReducer>[1];
export type HydrateAction = PayloadAction<RootState, typeof HYDRATE>;

const reducer = (
  state: RootState | undefined,
  action: RootAction | HydrateAction
): RootState => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const makeStore = (): Store =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
const store = makeStore();

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const wrapper = createWrapper(makeStore);
export default store;
