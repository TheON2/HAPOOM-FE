import React, { useState } from 'react';
import KebabMenuUI, {
  KebabMenuAptionButton,
  KebabMenuStyle,
} from '../common/KebabMenuUI';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost, reportPost } from '@/api/post';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/router';
import Modal from '../common/Modal';
import OneButtonModal from '../common/OneButtonModal';
import { UserState } from '@/redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';

export type commentProps = {
  data: string;
  id: string;
  userData: string | null | undefined;
};

const DetailKebabMenu = ({ data, userData, id }: commentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const {
    isModalOpen: oneModalOpen,
    modalMessge: oneModalMessage,
    openModal: openOneModal,
    closeModal: closeOneModal,
  } = useModal();
  const { mutate: delete_mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');

      openOneModal({
        actionText: '확인',
        modalMessge: '게시물이 삭제 되었습니다.',
        onClickEvent: () => router.push('/'), // 이 부분을 추가합니다.
      });
    },
  });

  const { mutate: report } = useMutation(reportPost, {
    onSuccess: (messag) => {
      setModalMessge({
        actionText: '확인',
        modalMessge: messag,
        onClickEvent: null,
      });
      setIsModalOpen(true);
    },
  });

  const handleEditClick = () => {
    router.push(`/update/${id}`);
  };

  const handleDeleteClick = () => {
    setModalMessge({
      actionText: '삭제',
      modalMessge: '정말로 해당 게시글을 삭제하시겠습니까?',
      onClickEvent: () => delete_mutate(id),
    });
    setIsModalOpen(true);
  };

  const handleReportClick = () => {
    setModalMessge({
      actionText: '신고',
      modalMessge: '해당 게시글을 신고하시겠습니까?',
      onClickEvent: () => report(id),
    });
    setIsModalOpen(true);
  };
  return (
    <>
      {oneModalOpen && (
        <OneButtonModal
          isOpen={oneModalOpen}
          setIsOpen={closeOneModal}
          onClickEvent={oneModalMessage.onClickEvent || null}
        >
          {oneModalMessage.modalMessge}
        </OneButtonModal>
      )}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        {modalMessge.modalMessge}
      </Modal>
      <KebabMenuUI>
        <KebabMenuStyle>
          {data === userData || user.super ? (
            <>
              <KebabMenuAptionButton onClick={handleDeleteClick}>
                글 삭제하기 <span></span>
              </KebabMenuAptionButton>
              <KebabMenuAptionButton onClick={handleEditClick}>
                글 수정하기 <span></span>
              </KebabMenuAptionButton>
            </>
          ) : (
            <KebabMenuAptionButton onClick={handleReportClick}>
              신고하기 <span></span>
            </KebabMenuAptionButton>
          )}
        </KebabMenuStyle>
      </KebabMenuUI>
    </>
  );
};

export default DetailKebabMenu;
