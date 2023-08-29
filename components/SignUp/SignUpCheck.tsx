import React from 'react';
import {
  Checkbox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  StyledLabel,
  StyledLabelAll,
  Line,
  TextErrorParagraph,
  StyledLabelEssential,
  SignUpCheckBoxAll,
} from '@/styles/signUp';
import { CheckBoxInterface } from './SingUpUi';

interface SignUpCheckProps {
  checkboxes: CheckBoxInterface;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement & { name: keyof CheckBoxInterface }>
  ) => void;
  checkboxErrorMessage: string;
}

const SignUpCheck: React.FC<SignUpCheckProps> = ({
  checkboxes,
  handleCheckboxChange,
  checkboxErrorMessage,
}) => {
  return (
    <>
      <SignUpCheckBoxLayout>
        <SignUpCheckBoxAll>
          <Checkbox
            id="checkAll"
            type="checkbox"
            name="checkAll"
            checked={checkboxes.checkAll}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkAll"></label>
          <StyledLabelAll>전체동의</StyledLabelAll>
          <StyledLabel>선택항목에 대한 동의 포함</StyledLabel>
        </SignUpCheckBoxAll>
        <Line $marginTop={'18px'}></Line>

        <div style={{ marginTop: '-12px' }}>
          <SignUpCheckBox>
            <Checkbox
              id="check-terms"
              type="checkbox"
              name="checkTerms"
              checked={checkboxes.checkTerms}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-terms"></label>
            <StyledLabelEssential>이용약관 (필수)</StyledLabelEssential>
          </SignUpCheckBox>

          <SignUpCheckBox>
            <Checkbox
              id="check-personalInfo"
              type="checkbox"
              name="checkPersonalInfo"
              checked={checkboxes.checkPersonalInfo}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-personalInfo"></label>
            <StyledLabelEssential>
              개인정보 수집/이용 동의 (필수)
            </StyledLabelEssential>
          </SignUpCheckBox>

          <SignUpCheckBox>
            <Checkbox
              id="check-newsletter"
              type="checkbox"
              name="checkNewsletter"
              checked={checkboxes.checkNewsletter}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-newsletter"></label>
            <StyledLabelEssential>
              개인정보 마케팅 활용 동의 (필수)
            </StyledLabelEssential>
          </SignUpCheckBox>
        </div>
      </SignUpCheckBoxLayout>

      {checkboxErrorMessage && (
        <TextErrorParagraph style={{ marginTop: '10px' }}>
          {checkboxErrorMessage}
        </TextErrorParagraph>
      )}
    </>
  );
};

export default React.memo(SignUpCheck);
