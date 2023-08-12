import React, { useState } from 'react';
import { styled } from 'styled-components';
// import { blueColor, grayColor } from '../assets/styles/colors';
// import Button from '../components/Button';
// import Icon from '../assets/icons/icons';
import { RightArrow } from './SVG';
type selectProps = {
  selectOption: { value: string; text: string }[];
  setOption: any;
};

export const Selecter = ({ selectOption, setOption }: selectProps) => {
  const [isShow, setIsShow] = useState(false);
  const [selectText, setSelectText] = useState(selectOption[0].text);

  const SelectClick = () => {
    setIsShow(!isShow);
  };

  const OptionClick = (value: string, text: string) => {
    setSelectText(text);
    setIsShow(!isShow);
    setOption(value);
  };

  return (
    <>
      <SelectBarButton type="button" onClick={SelectClick}>
        {selectText}
        <RightArrow />
      </SelectBarButton>
      {isShow && (
        <SelectList>
          {selectOption.map((option, idx) => {
            return (
              <SelectItem
                key={idx}
                value={option.value}
                onClick={() => OptionClick(option.value, option.text)}
              >
                {option.text}
              </SelectItem>
            );
          })}
        </SelectList>
      )}
    </>
  );
};
// 이게 꼭 필요한 것인가?
// const SelectItemNonHidden = ({ children }) => {
//     return <ItemNonHidden>{children}</ItemNonHidden>;
// };
const SelectBarButton = styled.button`
  width: 250px;
  height: 40px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SelectList = styled.ul`
  width: 250px;
  background-color: #efefef;
  position: absolute;
  top: 98px;
`;
const SelectItem = styled.li`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
const SelectBox = styled.div`
  height: 40px;
`;
