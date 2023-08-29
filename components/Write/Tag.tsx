import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
interface TagProps {
  tag: string;
  onDelete: (tag: string) => void;
}
interface TagStyleProps {
  noHover?: boolean;
}
export const TagStyle = styled.div<TagStyleProps>`
  color: #0084ff;
  cursor: ${(props) => (props.noHover ? 'default' : 'pointer')};
  display: inline-block;
  padding: 8px 20px 6px;
  border-radius: 20px;
  border: 2px solid #0084ff;
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
`;

const Tag: React.FC<TagProps> = ({ tag, onDelete }) => {
  return <TagStyle onClick={() => onDelete(tag)}>#{tag}</TagStyle>;
};

export default Tag;
