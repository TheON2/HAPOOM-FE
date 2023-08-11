import { styled } from 'styled-components';

const theme = {
  textColor: '#000',
  fontFamily: 'Inter',
  primaryColor: '#0084FF',
  inputBtnBoxWidth: '100%',
};
export const SignInSection = styled.section`
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 500px) {
    padding: 0 24px;
  }
`;
export const SignInContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const MainHeadText = styled.h1`
  color: ${theme.primaryColor};
  text-align: center;
  font-family: ${theme.fontFamily};
  font-size: 40px;
  font-weight: 900;
`;
export const StyledInputBox = styled.div`
  max-width: 312px;
  width: ${theme.inputBtnBoxWidth};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StyledInput = styled.input`
  height: 40px;
  outline: none;
  padding-left: 28px;
  border: 1px solid ${theme.primaryColor};
  &::placeholder {
    font-size: 12px;
  }
`;
export const StyledEmailInput = styled(StyledInput)`
  border-radius: 5px 5px 0 0;
  border-bottom: none;
`;
export const StyledPasswordInput = styled(StyledInput)`
  border-radius: 0 0 5px 5px;
`;
export const SignInBtn = styled.button`
  max-width: 312px;
  width: ${theme.inputBtnBoxWidth};
  height: 44px;
  border-radius: 8px;
  border: 1px solid ${theme.primaryColor};
  background: ${theme.primaryColor};
  color: #fff;
  outline: none;
  text-align: center;
  font-family: ${theme.fontFamily};
  font-size: 16px;
  font-weight: 400;
  margin-top: 15px;
  cursor: pointer;
`;
export const TextParagraph = styled.p`
  color: ${theme.textColor};
  font-family: ${theme.fontFamily};
  font-size: 12px;
  font-weight: 700;
`;
export const TextSnsParagraph = styled.p`
  color: #B1B1B1;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  margin: 40px 0 5px 0;
`;
export const TextPwSetParagraph = styled(TextParagraph)`
  position: relative;
  display: flex;
  align-items: center;
  width: 91px;
  height: 29px;
  color: ${theme.textColor};
  font-family: ${theme.fontFamily};
  font-size: 12px;
  font-weight: 700;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0.5px;
    height: 8px;
    background-color: #000;
  }
`;
export const TextSignUpLinkParagraph = styled(TextParagraph)`
  display: flex;
  align-items: center;
  width: 46px;
  height: 29px;
  color: ${theme.textColor};
  font-family: ${theme.fontFamily};
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;
export const Separator = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: -18px;
  margin-right: 11px;
  &:after {
    content: '';
    width: 1px;
    height: 8px;
    background-color: #000;
  }
`;
export const TextErrorParagraph = styled.p`
  max-width: 227px;
  height: 27px;
  color: red;
  font-family: ${theme.fontFamily};
  font-size: 10px;
  font-weight: 700;
  line-height: 2.5;
  margin-top: 8px;
`;
export const SignUpSocialSignUpBox = styled.div`
  width: ${theme.inputBtnBoxWidth};

  /* height: 120px; */

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
export const PwdSignUpSettingPageLink = styled.div`
  display: flex;
  margin-top: 20px;
  color: #868686;
  font-family: Inter;
  font-size: 20px;
  cursor: pointer;
`;
