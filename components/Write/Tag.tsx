import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Xmark } from '../common/SVG';
interface TagProps {
  tag: string;
  onDelete: (tag: string) => void;
}
const TagBox = styled.div`
  position: relative;
  cursor: pointer;
  .remove {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #f0efef;
    border: 2px solid #e8e8e8;
    position: absolute;
    top: -6px;
    right: -6px;
    overflow: hidden;
    svg {
      transform: translate(-2px, -2px);
    }
  }
`;
export const TagStyle = styled.div`
  color: #0084ff;
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
  return (
    <TagBox onClick={() => onDelete(tag)}>
      <TagStyle>#{tag}</TagStyle>
      <span className="remove">
        <Xmark />
      </span>
    </TagBox>
  );
};

export default Tag;
