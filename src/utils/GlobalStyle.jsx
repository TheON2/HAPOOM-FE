import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,body {
        padding : 0;
        margin : 0;
        font-family: "Noto Sans KR","Apple SD Gothic Neo",sans-serif;
    }


    a {
        color : inherit;
        text-decoration : none;
    }

    ul {
        padding : 0;
        margin : 0;
        list-style : none;
    }
`;

export default GlobalStyle;
