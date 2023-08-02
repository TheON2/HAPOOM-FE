import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LocalStorageKey {
  Token = 'token',
}

export interface UserState {
  user: {
    email: string | null;
    nickName: string | null;
  };
}

export interface UserResponse {
  email: string | null;
  nickname: string | null;
  token: string;
}

const initialState: UserState = {
  user: {
    email: null,
    nickName: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN_USER: (state: UserState, action: PayloadAction<UserResponse>) => {
      state.user.email = action.payload.email;
      state.user.nickName = action.payload.nickname;
      localStorage.setItem(LocalStorageKey.Token, action.payload.token);
    },
    LOGOUT_USER: (state: UserState) => {
      state.user.email = null;
      state.user.nickName = null;
      localStorage.removeItem(LocalStorageKey.Token);
    },
    AUTH_USER: (state: UserState, action: PayloadAction<UserResponse>) => {
      state.user.email = action.payload.email;
      state.user.nickName = action.payload.nickname;
    },
    UNAUTH_USER: (state: UserState) => {
      state.user.email = null;
      state.user.nickName = null;
      localStorage.removeItem(LocalStorageKey.Token);
    },
  },
});

export const { LOGIN_USER, LOGOUT_USER, AUTH_USER, UNAUTH_USER } =
  userSlice.actions;

export default userSlice.reducer;
