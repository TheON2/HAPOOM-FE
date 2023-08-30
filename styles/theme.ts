import 'styled-components';
import styled, { createGlobalStyle } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
  }
}
export const ThemeGlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) =>
      theme.mode === 'dark' ? '#152b4e' : '#fff'};
  }
`;
