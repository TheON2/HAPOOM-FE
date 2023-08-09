import React from 'react';
import styled from 'styled-components';
import AccordianMenu from '@/components/common/AccordianMenu';

const ThemesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    padding: 10px 0 8px;
    border-radius: 24px;
    font-size: 12px;
    border: none;
    &:nth-child(1) {
      background-color: #fff;
      border: 1px solid #5f7ba6;
    }
    &:nth-child(2) {
      background-color: #132b4f;
      color: #fff;
    }
    &:nth-child(3) {
      background-color: #000;
      color: #fff;
    }
  }
`;

const Themes = () => {
  return (
    <AccordianMenu tabText="Theme">
      <ThemesBox>
        <button>Original Mode</button>
        <button>Midnight Mode</button>
        <button>Dark Mode</button>
      </ThemesBox>
    </AccordianMenu>
  );
};

export default Themes;
