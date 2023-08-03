import Image from "next/image";
import { styled } from "styled-components";

const textColor = "#000";
const fontFamily = "Inter";
const inputBtnBoxWidth = "533px";
const inputBtnHeight = "63px";

export const SignInSection = styled.section`
width:1440px;
margin: 0 auto;
`
export const SignInContainer = styled.div`
width: 500px;
`
export const MainHeadText = styled.h1`
  color: ${textColor};
  text-align: center;
  font-family: ${fontFamily};
  font-size: 48px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
export const StyledInputBox = styled.div`
  width: ${inputBtnBoxWidth};
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;
export const StyledInput = styled.input`
  height: ${inputBtnHeight};
  outline: none;
`;
export const SignUpBtn = styled.button`
  width: ${inputBtnBoxWidth};
  height: ${inputBtnHeight};
  border-radius: 20px;
  background: #5A5A5A;
  color: #FFF;
  text-align: center;
  font-family: ${fontFamily};
  font-size: 16px;
  font-weight: 400;
`;

export const TextParagraph = styled.p`
  color: ${textColor};
  font-family: ${fontFamily};
  font-size: 16px;
  font-weight: 700;
`;
export const TextParagraphSns = styled(TextParagraph)`
  margin-top: 20px;
`;
export const SignUpSocialSignUpBox = styled.div`
  width: ${inputBtnBoxWidth};
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
export const SocialBoxImg = styled(Image)`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 100%;
  cursor: pointer;
`;
