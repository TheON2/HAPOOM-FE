import styled, { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
`;

export const GlobalStyle = createGlobalStyle`
  body{
    color: #051619;
    font-size: 14px;
    font-family: "Noto Sans KR","Apple SD Gothic Neo",sans-serif;
    line-height: 1.8;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    letter-spacing: -.0125rem;
    margin: 0;
  }
  `;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  /* padding: 20px 30px; */
  gap: 30px;
  /* height: 10vh; */
  .image {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const DetialContentSection = styled.section`
  margin-bottom: 40px;
  h3 {
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #cdcdcd;
    font-size: 16px;
    line-height: 16px;
    &::after {
      content: '';
      display: block;
      position: relative;
      bottom: -10px;
      width: 60px;
      height: 3px;
      background-color: #0084ff;
    }
  }
  .comments-header {
    display: flex;
    gap: 8px;
    h3 {
      width: 60%;
    }
    button {
      width: 40%;
      padding: 4px 22px 2px;
    }
  }
  & > div:last-child {
    border: none;
  }
`;

export const OtherProfileBox = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContentsContainer = styled.div`
  width: 100%;
  padding: 0 24px;
  /* position: relative; */
  .heart {
    position: static;
    width: 36px;
    height: 36px;
    margin-top: 10px;
    margin-bottom: 12px;
  }
  .detail-content-text {
    margin-bottom: 12px;
  }
  .carousel-box {
    border-radius: 8px;
    overflow: hidden;
    height: 26vh;
  }
`;
export const HashtagBox = styled.div`
  display: flex;
  gap: 8px;
`;

export const Hashtag = styled.div`
  padding: 4px 12px 2px;
  border: 1px solid #000;
  border-radius: 20px;
  font-size: 10px;
`;

export const CommentForm = styled.form`
  width: 100%;
  padding: 8px 0;
  textarea {
    width: 100%;
    height: 141px;
    padding: 16px 12px;
    margin-top: 8px;
    resize: none;
    border: 1px solid #0084ff;
    border-radius: 3px;
    ::placeholder {
      color: #b3b3b3;
    }
  }
`;
