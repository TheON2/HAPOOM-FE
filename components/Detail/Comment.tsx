import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import { DeleteComment, EditComment } from '@/components/common/SVG';
import styled from 'styled-components';

const CommentsContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
`;
const CommentBox = styled.div`
  width: 100%;
  padding: 16px 0;
  .comment-profile {
    display: flex;
    gap: 12px;
  }
  .comment-image {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .comment {
    width: calc(100% - 48px);
    margin: 4px 0 0 auto;
    color: #737373;
    font-size: 12px;
    height: 70px;

    p {
      padding: 14px 12px 12px;
      line-height: 20px;
    }

    textarea {
      resize: none;
      width: 100%;
      height: 70px;
      padding: 14px 12px 12px;
      font-size: 12px;
      line-height: 20px;
      color: #737373;
      border: none;
      background-color: #f0efef;
      border-radius: 3px;
    }
  }
`;
const CommentInfomation = styled.div`
  width: calc(100% - 48px);
  display: flex;
  justify-content: space-between;
  .comment-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    p {
      font-weight: 700;
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 6px;
    }
    span {
      color: #b7b4b4;
      font-size: 8px;
      line-height: 8px;
    }
  }
  .comment-button-box {
    display: flex;
  }
`;

type styleProps = {
  $up: boolean;
};

const CreateComment = styled.div<styleProps>`
  width: 100%;
  /* height: 80vh; */
  padding: 20px 24px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 15;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.$up ? `translateY(0)` : `translateY(70%)`)};
  transition: all 0.8s ease-in-out;
  span {
    display: block;
    width: 23px;
    height: 3px;
    margin: 0 auto 25px;
    border-radius: 2px;
    background-color: #ddd;
  }
`;

const CommentForm = styled.form`
  width: 100%;
  padding: 8px 0;
  textarea {
    width: 100%;
    height: 141px;
    padding: 16px 12px;
    margin-top: 8px;
    resize: none;
    border: 1px solid #0084ff;
    border-radius: 3px;
    ::placeholder {
      color: #b3b3b3;
    }
  }
`;

const DetialContentSection = styled.section`
  margin-bottom: 40px;
  h3 {
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #cdcdcd;
    font-size: 16px;
    line-height: 16px;
    &::after {
      content: '';
      display: block;
      position: relative;
      bottom: -10px;
      width: 60px;
      height: 3px;
      background-color: #0084ff;
    }
  }
  .comments-header {
    display: flex;
    gap: 8px;
    h3 {
      width: 60%;
    }
    button {
      width: 40%;
      padding: 4px 22px 2px;
    }
  }
  .button-box {
    width: 40%;
    display: flex;
    gap: 8px;
    button {
      width: 50%;
      padding: 4px 4px 2px;
    }
  }
  & > div:last-child {
    border: none;
  }
`;
type Props = {
  onClickUpdateEvent: () => void;
  onClcikDeleteEvent: (commentId: number) => void;
  data: any;
};
const Comment = ({ onClickUpdateEvent, onClcikDeleteEvent, data }: Props) => {
  // console.log(data);
  return (
    <>
      <CommentsContainer>
        <CommentBox>
          <div className="comment-profile">
            <div className="comment-image">
              <Image src={data.userImage} alt="" width={100} height={100} />
            </div>
            <CommentInfomation>
              <div className="comment-info">
                <p>{data.nickname}</p>
                <span>3시간전</span>
              </div>
              <div className="comment-button-box">
                <IconButton onClick={onClickUpdateEvent}>
                  <EditComment />
                </IconButton>
                <IconButton onClick={() => onClcikDeleteEvent(data.commentId)}>
                  <DeleteComment />
                </IconButton>
              </div>
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

export default Comment;
