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
  gap: 16px;
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
  h2 {
    font-size: 20px;
    width: calc(100% - 62px);
  }
`;
type DetialContentSectionProps = {
  $marginTop?: string;
};
export const DetialContentSection = styled.section<DetialContentSectionProps>`
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : '36px')};
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
  &.content-box {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
  .button-box {
    width: 100%;
    display: flex;
    gap: 8px;
    button {
      width: 50%;
    }
  }
  & > div:last-child {
    border: none;
  }
`;
export const DetailContentBox = styled.div`
  width: 100%;
  padding: 20px 24px;
  background-color: #f5faff;
  border: 1px solid #e2f3ff;
  border-radius: 8px;
  word-break: break-word;
  /* min-height: 120px; */
  /* margin-bottom: 12px; */
  color: #082d42;
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
    /* position: static; */
    top: auto;
    bottom: 12px;
    right: 12px;
    width: 46px;
    height: 46px;
    /* margin-top: 10px; */
    /* margin-bottom: 12px; */
  }
  .carousel-box {
    border-radius: 8px;
    overflow: hidden;
    height: 45vh;
    position: relative;
  }
`;
export const HashtagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Hashtag = styled.div`
  color: #0084ff;
  display: inline-block;
  padding: 4px 20px 4px;
  border-radius: 20px;
  border: 2px solid #0084ff;
  text-align: center;
  font-size: 14px;
`;

export const CommentForm = styled.form`
  width: 100%;
  padding: 8px 0;
`;
export const TextareaBox = styled.div`
  position: relative;
  margin-bottom: 12px;
  textarea {
    width: 100%;
    height: 120px;
    padding: 20px 24px;
    background-color: #f0efef;
    border: 2px solid #e8e8e8;
    margin-top: 8px;
    resize: none;
    border-radius: 12px;
    font-size: 15px;
    outline: none;
    ::placeholder {
      color: #b3b3b3;
    }
  }
`;
type limitProps = {
  $color: boolean;
};
export const LimitNumBox = styled.span<limitProps>`
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: ${(props) => (props.$color ? '#FF5D5D' : '#334765')};
`;
// comment components style
export const CommentsContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
`;
export const CommentBox = styled.div`
  width: 100%;
  padding: 16px 0;
  .comment-profile {
    display: flex;
    gap: 12px;
  }
  .comment-image {
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
  .comment {
    width: calc(100% - 58px);
    margin: 4px 0 0 auto;
    color: #737373;
    font-size: 14px;
    /* height: 70px; */

    p {
      padding: 14px 12px 12px;
      line-height: 20px;
    }

    textarea {
      resize: none;
      width: 100%;
      height: 70px;
      padding: 14px 12px 12px;
      font-size: 12px;
      line-height: 20px;
      color: #737373;
      border: none;
      background-color: #f0efef;
      border-radius: 3px;
    }
  }
`;
export const CommentInfomation = styled.div`
  width: calc(100% - 58px);
  display: flex;
  justify-content: space-between;
  .comment-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    p {
      font-weight: 700;
      font-size: 14px;
      line-height: 12px;
      margin-bottom: 6px;
    }
    span {
      color: #b7b4b4;
      font-size: 10px;
      line-height: 8px;
    }
  }
  .comment-button-box {
    display: flex;
    &.active button:nth-child(1) svg path {
      fill: #369dfe;
    }
  }
`;

export const CommentButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 0 0;
  gap: 2px;
  color: #fff;
  font-size: 10px;
  position: fixed;
  right: 24px;
  bottom: 12vh;
  bottom: 12dvh;
  background-color: #52acff;
  border: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 115;
  @media screen and (min-width: 786px) {
    right: 34px;
    bottom: 22vh;
    bottom: 22dvh;
  }
`;

export const NoneComment = styled.div`
  width: 100%;
  padding: 36px 0;
  text-align: center;
  line-height: 1.8;
  color: #777;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  label {
    position: absolute;
    top: calc(50% - 9px);
    left: 13px;
  }
`;

export const SelectContainer = styled.div`
  top: 4px;
  left: 4px;
  position: absolute;
  width: 22%;
`;

export const CustomSelect = styled.div`
  padding: 7px 12px 10px;
  width: 100%;
  height: 35px;
  border-radius: 10px;
  color: #fff;
  background-color: #5aabf6;
  position: relative;
  &:hover {
    background-color: #0988ff;
  }
`;

export const DropdownIcon = styled.span`
  font-size: 5px;
  position: absolute;
  top: 50%;
  right: 10px;
  color: #fff;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  height: 35px;
  position: absolute;
  top: 100%; /* 드롭다운 옵션을 아래로 내림 */
  left: 0;
  right: 0;
  background-color: #5aabf6;
  color: #fff;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
`;

export const OptionItem = styled.div`
  padding: 7px 12px 10px;
  height: 35px;
  cursor: pointer;

  &:hover {
    background-color: #0988ff;
    border-radius: 10px;
  }
`;
