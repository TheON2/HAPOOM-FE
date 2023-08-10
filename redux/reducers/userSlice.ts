import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LocalStorageKey {
  Token = 'token',
}

export interface UserState {
  user: {
    email: string | null;
    nickName: string | null;
    userImage: string | null;
    preset: number | null;
  };
}

export interface UserResponse {
  email: string | null;
  nickname: string | null;
  userImage: string | null;
  preset: number | null;
}

const initialState: UserState = {
  user: {
    email: null,
    nickName: null,
    userImage: null,
    preset: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN_USER: (state: UserState, action) => {
      state.user.email = action.payload.email;
      state.user.nickName = action.payload.nickname;
      state.user.userImage = action.payload.userImage;
      state.user.preset = action.payload.preset;
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
      state.user.userImage = action.payload.userImage;
      state.user.preset = action.payload.preset;
    },
  },
});

export const { LOGIN_USER, LOGOUT_USER, AUTH_USER } = userSlice.actions;

export default userSlice.reducer;
