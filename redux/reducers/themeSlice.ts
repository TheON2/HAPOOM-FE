import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  mainTextColor: string;
}

const initialState: ThemeState = {
  mode: typeof window !== 'undefined' ? (localStorage.getItem('theme') as ThemeMode || 'light') : 'light',
  mainTextColor: typeof window !== 'undefined' ? (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') : '#000',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeAll: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.mainTextColor = action.payload === 'dark' ? '#fff' : '#000';
    },
  },
});

export const { setThemeAll } = themeSlice.actions;
export default themeSlice.reducer;
