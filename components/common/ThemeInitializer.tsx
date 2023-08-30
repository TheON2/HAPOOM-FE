import { RootState } from '@/redux/config/configStore';
import { setThemeAll } from '@/redux/reducers/themeSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ThemeInitializer = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (
      storedTheme === 'light' ||
      (storedTheme === 'dark' && currentTheme !== storedTheme)
    ) {
      dispatch(setThemeAll(storedTheme));
    }
  }, []);

  return null;
};

export default ThemeInitializer;
