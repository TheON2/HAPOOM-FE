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

export const DetailSection = styled.section`
  max-width: 360px;
  border: 1px solid black;
  margin: auto;
  padding-right: 24px;
  padding-left: 24px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center; // 필요한 경우
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%; // 버튼 바로 아래에 위치
  left: auto; // 왼쪽을 자동으로 결정
  right: 0; // 오른쪽에 맞춤
  width: 200px; // 필요한 경우 너비 지정
  background-color: #fff;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  z-index: 1000; // 다른 요소 위에 표시되도록 함
`;

export const UserHeaderBox = styled.div`
  position: relative; // 이 부분을 추가했습니다.
  display: flex;
  justify-content: space-between; // 추가
  align-items: center; // 추가 (필요에 따라)
  border: 1px solid black;

  .userPic {
    width: 46px;
    height: 46px;
    border: 1pfx solid black;
    border-radius: 50%;
  }

  .userNickname {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
  }
`;

export const UserPictureBox = styled.div`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: 212px;
  margin-bottom: 30px;
  position: relative; // 상대 위치 설정
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .dot-navigation {
    display: flex;
    justify-content: center;
    z-index: 1001; // 높은 z-index 값 설정
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
  }

  .dot {
    height: 10px;
    width: 10px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
    cursor: pointer;
  }

  .dot.active {
    background-color: #717171;
  }
`;

export const UserCommentBox = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid black;
`;

export const DetailYoutubePlayerComponent = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid black;

  background-color: #f2f2f2;
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
// 댓글

export const CommentContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
