import React from 'react';
import Image from 'next/image';
import IconButton from '@/components/common/IconButton';
import ProfileImage from '@/components/common/ProfileImage';
import { DeleteComment, EditComment } from '@/components/common/SVG';
import {
  CommentsContainer,
  CommentBox,
  CommentInfomation,
} from '@/styles/detail';
import { CommentBoxProps } from '@/types/comment';

const timeSince = (date: string) => {
  const now: Date = new Date();
  const inputDate: Date = new Date(date);
  const seconds: number = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + '일 전';
  } else if (hours > 0) {
    return hours + '시간 전';
  } else if (minutes > 0) {
    return minutes + '분 전';
  } else {
    return '방금 전';
  }
};

const Comment = ({
  onClickUpdateEvent,
  onClickDeleteEvent,
  updateButtonActive,
  active,
  data,
  loggedUser,
}: CommentBoxProps) => {
  const updateButtonHandler = (commentId: number, comment: string) => {
    onClickUpdateEvent(commentId, comment);
    updateButtonActive(commentId);
  };

  const timeAgo = timeSince(data.createdAt);

  return (
    <>
      <CommentsContainer>
        <CommentBox>
          <div className="comment-profile">
            <div className="comment-image">
              <ProfileImage
                userImage={data.userImage}
                preset={data.preset ? data.preset : 5}
              />
            </div>
            <CommentInfomation>
              <div className="comment-info">
                <p>{data.nickname}</p>
                <span>{timeAgo}</span>
              </div>
              {data.nickname === loggedUser?.nickname ? (
                <div
                  className={
                    active === data.commentId
                      ? 'active comment-button-box'
                      : 'comment-button-box'
                  }
                >
                  <IconButton
                    onClick={() =>
                      updateButtonHandler(data.commentId, data.comment)
                    }
                  >
                    <EditComment />
                  </IconButton>
                  <IconButton
                    onClick={() => onClickDeleteEvent(data.commentId)}
                  >
                    <DeleteComment />
                  </IconButton>
                </div>
              ) : null}
            </CommentInfomation>
          </div>
          <div className="comment">
            <p>{data.comment}</p>
          </div>
        </CommentBox>
      </CommentsContainer>
    </>
  );
};

export default React.memo(Comment);
