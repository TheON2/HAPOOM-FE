import { RootState } from '@/redux/config/configStore';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
interface ThemedAppProps {
  children: ReactNode;
}
const ThemedApp = ({ children }: ThemedAppProps) => {
  const currentMode: any = useSelector((state: RootState) => state.theme.mode);

  return (
    <ThemeProvider theme={{ mode: currentMode }}>{children}</ThemeProvider>
  );
};

export default ThemedApp;
