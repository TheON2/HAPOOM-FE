import { StyledAuthInput } from '@/styles/write';
import React, { KeyboardEvent, useState, useCallback } from 'react';
import Tag from './Tag';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const MAX_TAGS = 5;

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleDelete = useCallback(
    (tagToDelete: string) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
    },
    [tags, setTags]
  );

  const handleTagChange = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();

        const newTag = e.currentTarget.value.trim();

        if (newTag && !tags.includes(newTag)) {
          if (newTag.length > 5) {
            alert('해시태그는 5글자를 넘길 수 없습니다!');
            return;
          }

          if (newTag.length < 2) {
            alert('해시태그는 최소 2글자 이상이어야 합니다!');
            return;
          }

          if (tags.length >= MAX_TAGS) {
            alert(`You can only have up to ${MAX_TAGS} tags.`);
            return;
          }

          setTags([...tags, newTag]);

          setInputValue('');
        }
      }
    },
    [tags, setTags]
  );

  const isMaxTags = tags.length >= MAX_TAGS;
  const color = isMaxTags ? 'red' : 'black';

  return (
    <>
      <StyledAuthInput
        type="text"
        placeholder="#태그"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleTagChange}
        style={{ width: '400px', border: '2px solid #0084ff' }}
        disabled={isMaxTags}
      />
      <div style={{ position: 'relative', width: 400 }}>
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            right: 10,
            color: color,
          }}
        >
          {tags.length}/{MAX_TAGS}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default TagInput;
