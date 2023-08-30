import { RootState } from '@/redux/config/configStore';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components';
interface ThemedAppProps {
  children: ReactNode;
}
const ThemedApp = ({ children }: ThemedAppProps) => {
  const theme = useSelector((state: RootState) => state.theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemedApp;
