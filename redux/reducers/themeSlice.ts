import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const initialState = {
  mode: typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeAll: (state, action: PayloadAction<string>) => {
      return { mode: action.payload };
    },
  },
});

export const { setThemeAll } = themeSlice.actions;
export default themeSlice.reducer;