  import 'styled-components';
  import styled, { createGlobalStyle } from 'styled-components';

  declare module 'styled-components' {
    export interface DefaultTheme {
      mode: 'light' | 'dark';
      mainTextColor: string;
    }
  }
  export const ThemeGlobalStyle = createGlobalStyle`
    body {
      background-color: ${({ theme }) =>
        theme.mode === 'dark' ? '#152b4e !important' : '#fff !important'};
      color: ${({ theme }) => theme.mainTextColor};
    }
  `;
