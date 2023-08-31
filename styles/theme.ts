// import 'styled-components';
// import styled, { createGlobalStyle, css } from 'styled-components';

// declare module 'styled-components' {
//   export interface DefaultTheme {
//     mode: 'light' | 'dark';
//     mainTextColor: string;
//   }
// }

// const darkModeStyles = css`
//   background-color: #132b4f;
//   color: #fff;
//   /* common color start */
//   --color: #fff;
//   --bg-color: #1b3863;
//   --primary-color: #2790f6;
//   --primary-opcity-color: #2790f670;
//   --primary-second-color: #0084ff;
//   --primary-three-color: #52acff;
//   --primary-hover-color: #1f6cb9;

//   --heart-color: #538cc080;
//   --heart-color-hover: #0084ff90;
//   --toggle-color: #a1afc6;
//   --nav-icon-color: #8995a7;
//   --button-hover-color: #7dc1ff;
//   --button-enabled-text: #333;
//   --button-enabled-color: #5a6a81;
//   --button-text-color: #fff;
//   --button-second-color: #52acff20;
//   --button-second-hover-color: #52acff50;

//   /* common color end */
//   /* header color start  */
//   --header-bg-color: #1b569580;
//   --header-border: 1px solid #1b5695;
//   /* header color end  */
//   /* feed color start */
//   --text-color: #fdfdfd;
//   --text-time-color: #9e9e9e;
//   --feed-border: 2px solid #334765;
//   /* feed color end */
//   /* trend color start */
//   --random-picture-bg-color: #fff;
//   --shadow-color: 0 16px 60px #174172;
//   --text-hightligth-color: #777;
//   --bar-color: #93999f;
//   --hashtag-bg-gradient: linear-gradient(
//     180deg,
//     rgba(0, 0, 0, 0.22) 60%,
//     #1b3863 70%,
//     #1b3863 90%,
//     #1b386399 95%,
//     #1b386300 100%
//     );
//     --hashtag-border-color: #7dc1ff;
//     --hashtag-gray: #93999f;
//     --hashtag-active: linear-gradient(#fff, #fff),
//     linear-gradient(38deg, rgba(255, 255, 255, 1) 0%, #1f6cb9 100%);

//     --section-gray: #1b3255;
//     --point-bg: #1b3255;
//     --random-text-color: #174172;
//     --slide-button-fill-color: #52acff;
//     /* trend color end */
//     /* write color start */
//     --text-blue-color: #174172;
//     --blue-bg-color: #eff7ff90;
//     --blue-border: 2px solid #1b5695;
//     --input-bg-color: #5a6a81;
//     --input-border: 2px solid #1b5695;

//     /* write color end */
//     /* search color start */
//     --search-bg-color: #1b5695 /* search color end */;
//     /* user color start */
//     --text-none-active: #83818c;
//     /* setting color start */
//     --text-tab-gray: #8995a7;
//     --setting-border: 2px solid #fff;
//     --input-pwd-text: #334765;
//     /* login color start */
//     --text-gray-second: #b1b1b1;

//   input,
//   textarea {
//     &::placeholder {
//       color: #fff;
//     }
//     color: #fff;
//   }
// `;

// const lightModeStyles = css`
//   background-color: #fff;
//   color: #334765;
//   /* common color start */
//   --color: #334765;
//   --bg-color: #fff;
//   --primary-color: #2790f6;
//   --primary-opcity-color: #2790f670;
//   --primary-second-color: #0084ff;
//   --primary-three-color: #52acff;
//   --primary-hover-color: #1f6cb9;

//   --heart-color: #538cc080;
//   --heart-color-hover: #0084ff90;
//   --toggle-color: #959595;
//   --nav-icon-color: #777;
//   --button-hover-color: #7dc1ff;
//   --button-enabled-color: #b3b3b3;
//   --button-text-color: #fff;
//   --button-second-color: #fff;
//   --button-second-hover-color: #7dc1ff;

//   /* common color end */
//   /* header color start  */
//   --header-bg-color: rgba(255, 255, 255, 0.8);
//   --header-border: 1px solid #fff;
//   /* header color end  */
//   /* feed color start */
//   --text-color: #232323;
//   --text-time-color: #9e9e9e;
//   --feed-border: 2px solid #efefef;
//   /* feed color end */
//   /* trend color start */
//   --random-picture-bg-color: #fff;
//   --shadow-color: 0 16px 60px #a8b5c890;
//   --text-hightligth-color: #777;
//   --bar-color: #93999f;
//   --hashtag-border-color: #deefff90;
//   --hashtag-bg-gradient: linear-gradient(
//     180deg,
//     rgba(255, 255, 255, 0.22) 60%,
//     #fff 70%,
//     #fff 90%,
//     rgba(255, 255, 255, 0.1) 95%,
//     rgba(255, 255, 255, 0) 100%
//   );
//   --hashtag-gray: #93999f;
//   --hashtag-active: linear-gradient(#fff, #fff),
//     linear-gradient(
//       38deg,
//       rgba(253, 253, 253, 1) 0%,
//       rgba(82, 172, 255, 1) 100%
//     );
//   --section-gray: #f0f1f2;
//   --point-bg: #2790f6;
//   --random-text-color: #52acff;
//   --slide-button-fill-color: #2797ff;
//   /* trend color end */
//   /* write color start */
//   --text-blue-color: #1f6cb9;
//   --blue-bg-color: #eff7ff;
//   --blue-border: 2px solid #dfefff;
//   --input-bg-color: #f0efef;
//   --input-border: 2px solid #e8e8e8;
//   /* write color end */

//   /* detail color start */
//   --detail-bg-color: #f5faff;
//   --detail-bg-border: 1px solid #e2f3ff;
//   --detail-img-bg-color: #efefef;
//   /* detail color end */
//   /* search color start */
//   --search-bg-color: #fff /* search color end */;
//   /* user color start */
//   --text-none-active: #83818c;
//   /* setting color start */
//   --text-tab-gray: #8995a7;
//   --setting-border: 2px solid #2790f6;
//   --input-pwd-text: #334765;
//   /* login color start */
//   --text-gray-second: #b1b1b1;
//   input,
//   textarea {
//     &::placeholder {
//       color: #929aa7;
//     }
//     color: #334765;
//   }
// `;

// export const ThemeGlobalStyle = createGlobalStyle`
//     body {
//       ${({ theme }) =>
//         theme.mode === 'dark' ? darkModeStyles : lightModeStyles}
//     }
// `;
import 'styled-components';
import styled, { createGlobalStyle, css } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    mainTextColor: string;
  }
}

const darkModeStyles = css`
  background-color: #132b4f;
  color: #fff;
  /* common color start */
  --color: #fff;
  --bg-color: #1b3863;
  --primary-color: #2790f6;
  --primary-opcity-color: #2790f670;
  --primary-second-color: #0084ff;
  --primary-three-color: #52acff;
  --primary-hover-color: #1f6cb9;

  --heart-color: #538cc080;
  --heart-color-hover: #0084ff90;
  --toggle-color: #a1afc6;
  --nav-icon-color: #8995a7;
  --button-hover-color: #7dc1ff;
  --button-enabled-text: #333;
  --button-enabled-color: #5a6a81;
  --button-text-color: #fff;
  --button-second-color: #52acff20;
  --button-second-hover-color: #52acff50;

  /* common color end */
  /* header color start  */
  --header-bg-color: #1b569580;
  --header-border: 1px solid #1b5695;
  /* header color end  */
  /* feed color start */
  --text-color: #fdfdfd;
  --text-time-color: #9e9e9e;
  --feed-border: 2px solid #334765;
  /* feed color end */
  /* trend color start */
  --random-picture-bg-color: #fff;
  --shadow-color: 0 16px 60px #174172;
  --text-hightligth-color: #777;
  --bar-color: #93999f;
  --hashtag-bg-gradient: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.22) 60%,
    #1b3863 70%,
    #1b3863 90%,
    #1b386399 95%,
    #1b386300 100%
  );
  --hashtag-border-color: #7dc1ff;
  --hashtag-gray: #93999f;
  --hashtag-active: linear-gradient(#fff, #fff),
    linear-gradient(38deg, rgba(255, 255, 255, 1) 0%, #1f6cb9 100%);
  --section-gray: #1b3255;
  --point-bg: #1b3255;
  --random-text-color: #174172;
  --slide-button-fill-color: #52acff;
  /* trend color end */
  /* write color start */
  --text-blue-color: #174172;
  --blue-bg-color: #eff7ff90;
  --blue-border: 2px solid #1b5695;
  --input-bg-color: #5a6a81;
  --input-border: 2px solid #1b5695;

  /* write color end */
  /* detail color start */
  --detail-bg-color: #174172;
  --detail-bg-border: 1px solid #1b5695;
  --detail-img-bg-color: #174172;
  /* detail color end */
  /* search color start */
  --search-bg-color: #1b5695 /* search color end */;
  /* user color start */
  --text-none-active: #83818c;
  /* setting color start */
  --text-tab-gray: #8995a7;
  /* login color start */
  --text-gray-second: #b1b1b1;
  input,
  textarea {
    &::placeholder {
      color: #fff;
    }
    color: #fff;
  }
`;

const lightModeStyles = css`
  background-color: #fff;
  color: #334765;
  /* common color start */
  --color: #334765;
  --bg-color: #fff;
  --primary-color: #2790f6;
  --primary-opcity-color: #2790f670;
  --primary-second-color: #0084ff;
  --primary-three-color: #52acff;
  --primary-hover-color: #1f6cb9;

  --heart-color: #538cc080;
  --heart-color-hover: #0084ff90;
  --toggle-color: #959595;
  --nav-icon-color: #777;
  --button-hover-color: #7dc1ff;
  --button-enabled-color: #b3b3b3;
  --button-text-color: #fff;
  --button-second-color: #fff;
  --button-second-hover-color: #7dc1ff;

  /* common color end */
  /* header color start  */
  --header-bg-color: rgba(255, 255, 255, 0.8);
  --header-border: 1px solid #fff;
  /* header color end  */
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
  --hashtag-bg-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.22) 60%,
    #fff 70%,
    #fff 90%,
    rgba(255, 255, 255, 0.1) 95%,
    rgba(255, 255, 255, 0) 100%
  );
  --hashtag-gray: #93999f;
  --hashtag-active: linear-gradient(#fff, #fff),
    linear-gradient(
      38deg,
      rgba(253, 253, 253, 1) 0%,
      rgba(82, 172, 255, 1) 100%
    );
  --section-gray: #f0f1f2;
  --point-bg: #2790f6;
  --random-text-color: #52acff;
  --slide-button-fill-color: #2797ff;
  /* trend color end */
  /* write color start */
  --text-blue-color: #1f6cb9;
  --blue-bg-color: #eff7ff;
  --blue-border: 2px solid #dfefff;
  --input-bg-color: #f0efef;
  --input-border: 2px solid #e8e8e8;
  /* write color end */

  /* detail color start */
  --detail-bg-color: #f5faff;
  --detail-bg-border: 1px solid #e2f3ff;
  --detail-img-bg-color: #efefef;
  /* detail color end */
  /* search color start */
  --search-bg-color: #fff /* search color end */;
  /* user color start */
  --text-none-active: #83818c;
  /* setting color start */
  --text-tab-gray: #8995a7;
  /* login color start */
  --text-gray-second: #b1b1b1;
  input,
  textarea {
    &::placeholder {
      color: #929aa7;
    }
    color: #334765;
  }
`;

export const ThemeGlobalStyle = createGlobalStyle`
    body {
      ${({ theme }) =>
        theme.mode === 'dark' ? darkModeStyles : lightModeStyles}
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    }
`;
