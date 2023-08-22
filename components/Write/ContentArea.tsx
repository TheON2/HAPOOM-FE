import React, { useState, useCallback } from 'react';
import { Box } from '@/styles/write';
interface ContentAreaProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentArea: React.FC<ContentAreaProps> = ({ content, setContent }) => {
  const maxLength = 140;

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.currentTarget.value.length <= maxLength) {
        setContent(event.currentTarget.value);
      }
    },
    [setContent]
  );

  const isMaxLength = content.length >= maxLength;
  const color = isMaxLength ? 'red' : 'black';

  return (
    <>
      <Box
        style={{
          display: 'flex',
          position: 'relative',
          // marginBottom: 50,
        }}
      >
        <label>문구입력</label>
        <textarea
          style={{
            width: '100%',
            height: '120px',
            resize: 'none',
            padding: '24px',
            border: '2px solid #0084ff',
          }}
          value={content}
          onChange={handleInputChange}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            right: 10,
            color: color,
          }}
        >
          {content.length}/{maxLength}
        </div>
      </Box>
    </>
  );
};

export default ContentArea;
