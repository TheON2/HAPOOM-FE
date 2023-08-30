import 'styled-components';
import styled, { createGlobalStyle, css } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    mainTextColor: string;
  }
}

const darkModeStyles = css`
  background-color: #152b4e;
  color: #fff;
  --header-color: #fff;
`;

const lightModeStyles = css`
  background-color: #fff;
  color: #333;
  --header-color: #2790f6;
`;

export const ThemeGlobalStyle = createGlobalStyle`
    body {
      ${({ theme }) =>
        theme.mode === 'dark' ? darkModeStyles : lightModeStyles}
    }
`;
