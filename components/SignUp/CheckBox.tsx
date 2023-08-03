import React, { useState } from 'react';
import {
  Checkbox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  SignUpBtn,
  StyledLabel,
  TextParagraph,
  StyledLabelAll,
  Line,
} from '@/styles/signUp';
import { CheckBoxInterface } from './SingUpUi';

interface CheckBoxProps {
  checkboxes: CheckBoxInterface;
  setCheckboxes: React.Dispatch<React.SetStateAction<CheckBoxInterface>>;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checkboxes, setCheckboxes }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'checkAll') {
      setCheckboxes({
        checkAll: checked,
        checkTerms: checked,
        checkPersonalInfo: checked,
        checkNewsletter: checked,
      });
    } else {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        checkAll:
          checkboxes.checkTerms && checkboxes.checkPersonalInfo && checked,
      });
    }
  };

  return (
    <>
      <TextParagraph>약관동의</TextParagraph>
      <SignUpCheckBoxLayout>
        <SignUpCheckBox>
          <Checkbox
            type="checkbox"
            name="checkAll"
            checked={checkboxes.checkAll}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check-all"></label>
          <StyledLabelAll>전체동의</StyledLabelAll>
          <StyledLabel>선택항목에 대한 동의 포함</StyledLabel>
        </SignUpCheckBox>
        <Line></Line>

        <SignUpCheckBox>
          <Checkbox
            type="checkbox"
            name="checkTerms"
            checked={checkboxes.checkTerms}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check-terms"></label>
          <StyledLabel>이용약관 (필수)</StyledLabel>
        </SignUpCheckBox>

        <SignUpCheckBox>
          <Checkbox
            type="checkbox"
            name="checkPersonalInfo"
            checked={checkboxes.checkPersonalInfo}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check-personalInfo"></label>
          <StyledLabel>개인정보 수집/이용 동의 (필수)</StyledLabel>
        </SignUpCheckBox>

        <SignUpCheckBox>
          <Checkbox
            type="checkbox"
            name="checkNewsletter"
            checked={checkboxes.checkNewsletter}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="check-newsletter"></label>
          <StyledLabel>개인정보 마케팅 활용 동의 (선택)</StyledLabel>
        </SignUpCheckBox>
      </SignUpCheckBoxLayout>
    </>
  );
};

export default CheckBox;
