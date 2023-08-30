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
  color: #e7e7e7;
  /* common color start */
  --primary-color: #2790f6;
  --primary-second-color: #0084ff;
  --primary-three-color: #52acff;
  --heart-color: #538cc080;
  --heart-color-hover: #0084ff90;
  --toggle-color: #959595;
  --nav-icon-stroke: #777;
  --button-hover-color: #7dc1ff;
  --button-enabled-color: #b3b3b3;
  /* common color end */
  /* feed color start */
  --text-color: #232323;
  --text-time-color: #9e9e9e;
  --feed-border: 2px solid #efefef;
  /* feed color end */
  /* trend color start */
  --random-picture-bg-color: #fff;
  --shadow-color: 0 16px 60px #a8b5c890;
  --text-hightligth-color: #777;
  --bar-color: #93999f;
  --hashtag-border-color: #deefff90;
  --hashtag-gray: #93999f;
  --hashtag-active: linear-gradient(#fff, #fff),
    linear-gradient(
      38deg,
      rgba(253, 253, 253, 1) 0%,
      rgba(82, 172, 255, 1) 100%
    );
  --section-gray: #f0f1f2;
  /* trend color end */
  /* write color start */
  --text-blue-color: #1f6cb9;
  --blue-bg-color: #eff7ff;
  --blue-border: 2px solid #dfefff;
  --input-bg-color: #f0efef;
  --input-border: 2px solid #e8e8e8;
  /* write color end */
  /* search color start */
  --search-bg-color: #fff /* search color end */;
  /* user color start */
  --text-none-active: #83818c;
  /* setting color start */
  --text-tab-gray: #8995a7;
  /* login color start */
  --text-gray-second: #b1b1b1;
`;

const lightModeStyles = css`
  background-color: #fff;
  color: #334765;
  /* common color start */
  --primary-color: #2790f6;
  --primary-second-color: #0084ff;
  --primary-three-color: #52acff;
  --heart-color: #538cc080;
  --heart-color-hover: #0084ff90;
  --toggle-color: #959595;
  --nav-icon-stroke: #777;
  --button-hover-color: #7dc1ff;
  --button-enabled-color: #b3b3b3;
  /* common color end */
  /* feed color start */
  --text-color: #232323;
  --text-time-color: #9e9e9e;
  --feed-border: 2px solid #efefef;
  /* feed color end */
  /* trend color start */
  --random-picture-bg-color: #fff;
  --shadow-color: 0 16px 60px #a8b5c890;
  --text-hightligth-color: #777;
  --bar-color: #93999f;
  --hashtag-border-color: #deefff90;
  --hashtag-gray: #93999f;
  --hashtag-active: linear-gradient(#fff, #fff),
    linear-gradient(
      38deg,
      rgba(253, 253, 253, 1) 0%,
      rgba(82, 172, 255, 1) 100%
    );
  --section-gray: #f0f1f2;
  /* trend color end */
  /* write color start */
  --text-blue-color: #1f6cb9;
  --blue-bg-color: #eff7ff;
  --blue-border: 2px solid #dfefff;
  --input-bg-color: #f0efef;
  --input-border: 2px solid #e8e8e8;
  /* write color end */
  /* search color start */
  --search-bg-color: #fff /* search color end */;
  /* user color start */
  --text-none-active: #83818c;
  /* setting color start */
  --text-tab-gray: #8995a7;
  /* login color start */
  --text-gray-second: #b1b1b1;
`;

export const ThemeGlobalStyle = createGlobalStyle`
    body {
      ${({ theme }) =>
        theme.mode === 'dark' ? darkModeStyles : lightModeStyles}
    }
`;
