import { SecretEye } from '@/components/common/SVG';
import Image from 'next/image';
import styled from 'styled-components';

const inputBtnBoxWidth = '100%';
const inputBtnHeight = '36px';
const theme = {
  textColor: '#000',
  primaryColor: '#0084FF',
  inputBtnBoxWidth: '100%',
};
interface Props {
  $marginBottom?: string;
  color?: string;
  width?: string;
  $borderColor?: string;
}
export const SignUpSection = styled.section`
  max-width: 360px;
  width: 100%;
  height: 1202px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 24px;
  form {
    max-width: 312px;
    width: 100%;
  }
`;
export const MainHeadText = styled.h1<Props>`
  color: #0084ff;
  text-align: center;
  font-size: 48px;
  font-weight: 900;
  margin-top: 56px;
`;
export const SubHeadText = styled.h2<Props>`
  color: ${({ color }) => color};
  font-size: 13px;
  font-weight: 700;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '0'};
`;
export const TextParagraph = styled.p`
  color: ${theme.textColor};
  font-size: 16px;
  font-weight: 700;
`;
export const TextParagraphInfo = styled(TextParagraph)<Props>`
  color: ${theme.textColor};
  font-size: 12px;
  font-weight: 700;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '0'};
`;
export const TextParagraphSns = styled(TextParagraph)`
  margin-top: 4px;
  color: #b1b1b1;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
`;
export const TextParagrapValidate = styled(TextParagraph)`
  color: #828c8c;
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 10px;
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
  /* max-width: 312px; */
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  position: relative;
`;
export const StyledInput = styled.input<Props>`
  width: 100%;
  height: 36px;
  outline: none;
  padding-left: 28px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 3px;
  &::placeholder {
    font-size: 12px;
  }
`;
export const SignUpBtn = styled.button`
  width: ${inputBtnBoxWidth};
  height: ${inputBtnHeight};
  border-radius: 3px;
  background: ${theme.primaryColor};
  border: 1px solid ${theme.primaryColor};
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
export const SignUpCheckBoxLayout = styled.div`
  max-width: 312px;
  height: 184px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.primaryColor};
  border-radius: 4px;
`;
export const SignUpCheckBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 11px;
`;
export const Checkbox = styled.input`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 10px 12px 0 28px;
  border: 1px solid ${theme.primaryColor};
  cursor: pointer;
`;
export const StyledLabelAll = styled.div`
  color: #000;
  font-size: 12px;
  font-weight: 700;
  margin: 8px 0 0 -4px;
  width: 88px;
  height: 12px;
`;
export const StyledLabel = styled.div`
  color: #000;
  font-size: 8px;
  width: 150px;
  height: 9px;
  margin: 11px 0 0 -46px;
`;
export const StyledLabelEssential = styled.div`
  color: #000;
  font-size: 12px;
  font-weight: 700;
  width: 180px;
  height: 9px;
  margin: 8px 0 0 -4px;
`;
export const SnsLine = styled.div`
  stroke-width: 1px;
  width: 100%;
  height: 0px;
  border: 1px solid #b3b3b3;
  margin: 20px 0 22px 0;
`;
export const Line = styled.div<Props>`
  /* width: 312px; */
  width: ${(props) => (props.width ? props.width : '312px')};
  border: 1px solid
    ${(props) => (props.$borderColor ? props.$borderColor : '#0084FF')};
  margin-bottom: 16px;
`;
export const TextErrorParagraph = styled.p`
  max-width: 227px;
  height: 28px;
  color: red;
  font-size: 10px;
  font-weight: 400;
  line-height: 2.5;
  margin-left: 4px;
`;
