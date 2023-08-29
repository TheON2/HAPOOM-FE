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
    likePosts: number[] | null;
    userId: number | null;
    push: boolean | null;
  };
}

export interface UserResponse {
  email: string | null;
  nickname: string | null;
  userImage: string | null;
  preset: number | null;
  likePosts: number[] | null;
  userId: number | null;
  push: boolean | null;
}

const initialState: UserState = {
  user: {
    email: null,
    nickName: null,
    userImage: null,
    preset: null,
    likePosts: null,
    userId: null,
    push: false,
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
      state.user.likePosts = action.payload.likePosts;
      state.user.push = action.payload.push;
      state.user.userId = action.payload.userId;
    },
    TOGGLE_PUSH: (state: UserState) => {
      state.user.push = !state.user.push;
    },
  },
});

export const { LOGIN_USER, LOGOUT_USER, AUTH_USER, TOGGLE_PUSH } =
  userSlice.actions;

export default userSlice.reducer;
