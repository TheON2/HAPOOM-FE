import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/redux/config/configStore';
import { setThemeAll } from '@/redux/reducers/themeSlice';

const ThemeInitializer = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      if (currentTheme !== storedTheme) {
        dispatch(setThemeAll(storedTheme as 'light' | 'dark'));
      }
    } else {
      dispatch(setThemeAll('light'));
    }
  }, [currentTheme, dispatch]);

  return null;
};

export default ThemeInitializer;
