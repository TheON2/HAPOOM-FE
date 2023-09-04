import React, { useState } from 'react';
import {
  Checkbox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  StyledLabel,
  StyledLabelAll,
  Line,
  TextErrorParagraph,
  SignUpCheckBoxAll,
  StyledLabelAtag,
} from '@/styles/signUp';
import { CheckBoxInterface } from './SingUpUi';
import Link from 'next/link';

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
            <Link
              href={
                'https://hungry-mascara-804.notion.site/3f44c3052bf14803a9999af89e578b2c?pvs=4'
              }
              legacyBehavior
            >
              <StyledLabelAtag target="_blank" rel="noopener noreferrer">
                이용약관 (필수)
              </StyledLabelAtag>
            </Link>
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
            <Link
              href={
                ' https://hungry-mascara-804.notion.site/1601cff46be942969916a72d2e5050b6?pvs=4'
              }
              legacyBehavior
            >
              <StyledLabelAtag target="_blank" rel="noopener noreferrer">
                개인정보 수집/이용 동의 (필수)
              </StyledLabelAtag>
            </Link>
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
            <Link
              href={
                'https://hungry-mascara-804.notion.site/96c59fa9494c499daf950ca561bed497?pvs=4'
              }
            >
              <StyledLabelAtag target="_blank" rel="noopener noreferrer">
                개인정보 마케팅 활용 동의 (선택)
              </StyledLabelAtag>
            </Link>
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
