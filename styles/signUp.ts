import Image from 'next/image';
import styled from 'styled-components';

const textColor = "#000";
const fontFamily = "Inter";
const inputBtnBoxWidth = "100%";
const inputBtnHeight = "63px";

export const SignUpSection = styled.section`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 500px) {
    padding: 0 20px;
  }
  form {
    max-width: 533px;
    width: 100%;
  }
`;
export const MainHeadText = styled.h1`
  color: ${textColor};
  text-align: center;
  font-family: ${fontFamily};
  font-size: 48px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
export const SubHeadText = styled.h2`
  color: ${textColor};
  font-family: ${fontFamily};
  font-size: 30px;
  font-weight: 400;
  text-align: left;
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
export const SignUpCheckBoxLayout = styled.div`
  width: ${inputBtnBoxWidth};
  height: 184px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 10px;  
`
export const SignUpCheckBox = styled.div`
  display : flex;
  justify-content: flex-start;
  margin-bottom: 15px;
`
export const Checkbox = styled.input`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 12px;
  border: 1px solid #000;
  background: #fff;
  cursor: pointer;
`
export const StyledLabelAll = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
`
export const StyledLabel = styled.div`
  color: #D9D9D9;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
`
export const Line = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 0;
  margin-bottom: 13px;
`