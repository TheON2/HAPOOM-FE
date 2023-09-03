import { InputBox, InputContainer, LimitNumBox, TagBox } from '@/styles/write';
import React, { KeyboardEvent, useCallback, useState } from 'react';
import Tag from './Tag';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const MAX_TAGS = 5;

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const { isModalOpen, modalMessge, openModal, closeModal } = useModal();
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false);

  const handleDelete = useCallback(
    (tagToDelete: string) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
    },
    [tags, setTags]
  );

  const handleTagChange = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        const newTag = e.currentTarget.value.trim();
        const hasSpecialCharacters =
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newTag);
        if (hasSpecialCharacters) {
          openModal({
            actionText: '확인',
            modalMessge: '해시태그에는 특수문자를 사용할 수 없습니다!',
          });
          return;
        }
        if (newTag === '전체' || newTag === '기타') {
          openModal({
            actionText: '확인',
            modalMessge: '해시태그에 "전체" 또는 "기타"를 사용할 수 없습니다!',
          });
          return;
        }
        if (newTag && !tags.includes(newTag)) {
          if (newTag.length > 5) {
            openModal({
              actionText: '확인',
              modalMessge: '해시태그는 5글자를 넘길 수 없습니다!',
            });
            return;
          }

          if (newTag.length < 2) {
            openModal({
              actionText: '확인',
              modalMessge: '해시태그는 최소 2글자 이상 이어야 합니다!',
            });
            return;
          }

          if (tags.length >= MAX_TAGS) {
            setIsMaxLength(true);
            openModal({
              actionText: '확인',
              modalMessge: `태그는 최대 ${MAX_TAGS}까지 업로드할 수 있습니다.`,
            });
            return;
          } else {
            setIsMaxLength(false);
          }

          setTags([...tags, newTag]);
          setInputValue('');
        }
      }
    },
    [tags, setTags]
  );

  const isMaxTags = tags.length >= MAX_TAGS;

  return (
    <>
      <InputContainer>
        <label>태그</label>
        <InputBox
          type="text"
          placeholder="태그를 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleTagChange}
          disabled={isMaxTags}
        />
        <LimitNumBox $color={isMaxTags}>
          {tags.length}/{MAX_TAGS}
        </LimitNumBox>
      </InputContainer>
      <p className="small">태그 입력후 ENTER or SPACE 를 눌러주세요!</p>
      <TagBox>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} onDelete={handleDelete} />
        ))}
      </TagBox>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={closeModal}
          actionText={modalMessge.actionText}
          onClickEvent={modalMessge.onClickEvent || null}
        >
          {modalMessge.modalMessge}
        </Modal>
      )}
    </>
  );
};

export default TagInput;
