import { useCallback, useState } from 'react';
import styled from 'styled-components';
interface TagProps {
  tag: string;
  onDelete: (tag: string) => void;
}

export const TagStyle = styled.div`
  color: #0084ff;
  cursor: pointer;
  display: inline-block;
  padding: 8px 20px 6px;
  border-radius: 20px;
  border: 2px solid #0084ff;
  text-align: center;
  &:hover {
    color: #ff5d5d;
    border: 2px solid #ff5d5d;
  }
`;

const Tag: React.FC<TagProps> = ({ tag, onDelete }) => {
  return <TagStyle onClick={() => onDelete(tag)}>#{tag}</TagStyle>;
};

export default Tag;
