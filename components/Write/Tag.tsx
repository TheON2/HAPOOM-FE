import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Xmark } from '../common/SVG';
interface TagProps {
  tag: string;
  onDelete: (tag: string) => void;
}
interface TagStyleProps {
  noHover?: boolean;
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
    top: 0px;
    right: -5px;
    overflow: hidden;
    svg {
      transform: translate(-2px, -2px);
    }
  }
`;

export const TagStyle = styled.div<TagStyleProps>`
  color: #0084ff;
  cursor: ${(props) => (props.noHover ? 'default' : 'pointer')};
  display: inline-block;
  padding: 2px 20px 2px 0;
  border-radius: 20px;
  text-align: center;

  ${(props) =>
    props.noHover
      ? css``
      : css`
          &:hover {
            color: #ff5d5d;
            border-color: #ff5d5d;
          }
        `}
  @media (max-width: 439px) {
    font-size: 12px;
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
