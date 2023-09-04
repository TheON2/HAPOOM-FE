import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Box, LimitNumBox } from '@/styles/write';
interface ContentAreaProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea = styled.textarea`
  width: 100%;
  height: 240px;

  resize: none;
  padding: 15px 24px;
  /* border: var(--input-border); */
  border: none;
  border-radius: 4px;
  background-color: var(--input-bg-color);
  font-size: 15px;
  outline: none;
  line-height: 24px;
  @media (min-width: 768px) {
    height: 165px;
  }
`;

const ContentArea: React.FC<ContentAreaProps> = ({ content, setContent }) => {
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false);

  const maxLength = 140;

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.currentTarget.value.length <= maxLength) {
        setContent(event.currentTarget.value);
      }
    },
    [setContent]
  );
  useEffect(() => {
    if (content.length >= maxLength) {
      setIsMaxLength(true);
    } else {
      setIsMaxLength(false);
    }
  }, [content]);
  return (
    <>
      <Box>
        <label>문구입력</label>
        <TextArea
          value={content}
          onChange={handleInputChange}
          placeholder="문구를 입력해주세요"
        />
        <LimitNumBox $color={isMaxLength}>
          {content.length}/{maxLength}
        </LimitNumBox>
      </Box>
    </>
  );
};

export default ContentArea;
