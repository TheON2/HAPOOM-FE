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
    <SelectBox $show={isShow}>
      <SelectBarButton type="button" onClick={SelectClick}>
        {selectText}
        <RightArrow />
      </SelectBarButton>
      {isShow && (
        <SelectList>
          {selectOption
            .filter((option) => option.text !== selectText)
            .map((option, idx) => {
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
    </SelectBox>
  );
};
// 이게 꼭 필요한 것인가?
// const SelectItemNonHidden = ({ children }) => {
//     return <ItemNonHidden>{children}</ItemNonHidden>;
// };
const SelectBarButton = styled.button`
  /* width: 250px; */
  width: 100%;
  height: 36px;
  padding: 0px 16px;
  background: none;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: 16px; */
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  svg {
    transform: scale(0.8) rotate(90deg);
    path {
      fill: #fff;
    }
  }
`;
const SelectList = styled.ul`
  width: 80px;
  /* background-color: #5aabf6; */
  /* position: absolute;
  top: 98px; */
`;
const SelectItem = styled.li`
  width: 100%;
  height: 36px;
  padding: 0px 16px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

type Props = {
  $show: boolean;
};

const SelectBox = styled.div<Props>`
  width: 80px;
  height: ${(props) => (props.$show ? 'calc(36px * 3)' : '36px')};
  background-color: #5aabf6;
  border-radius: 20px;
  position: absolute;
  z-index: 14;
  /* top: 4px; */
  /* left: 12px; */
  /* transform: translateY(-50%); */
`;
