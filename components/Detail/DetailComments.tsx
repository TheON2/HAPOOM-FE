import React, { useState } from 'react';
import {
  CommentContainer,
  CommentContent,
  CommentInputContainer,
} from '@/styles/detail';

type CommentData = {
  content: string;
  nickname: string;
  profileImageUrl: string;
  userId: string; // 유저 ID 추가
};

const DetailComments: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [borderColor, setBorderColor] = useState<string>('black');
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  // 가정: 로그인한 사용자의 정보
  const loggedInUser = {
    userId: '1234', // 예시 ID
    nickname: 'User123',
    profileImageUrl: 'https://example.com/profile.jpg',
  };
  // 댓글 시간 표시
  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + '년 전';
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + '달 전';
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + '일 전';
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + '시간 전';
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + '분 전';
    return Math.floor(seconds) + '초 전';
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const comment = event.target.value;
    if (comment.length > 149) {
      setBorderColor('red');
      alert('A comment exceeds the maximum length of 149 characters!');
    } else {
      setBorderColor('black');
      setNewComment(comment);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.length > 0) {
      const newCommentData: CommentData = {
        content: newComment,
        nickname: loggedInUser.nickname,
        profileImageUrl: loggedInUser.profileImageUrl,
        userId: loggedInUser.userId,
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  const handleEdit = (index: number) => {
    if (loggedInUser.userId === comments[index].userId) {
      setNewComment(comments[index].content);
      setEditingIndex(index);
    } else {
      alert('You do not have permission to edit this comment.');
    }
  };

  const handleSave = () => {
    if (newComment.length > 0) {
      const updatedComments = [...comments];
      updatedComments[editingIndex].content = newComment;
      setComments(updatedComments);
      setNewComment('');
      setEditingIndex(-1);
    }
  };

  const handleDelete = (index: number) => {
    if (loggedInUser.userId === comments[index].userId) {
      const updatedComments = [...comments];
      updatedComments.splice(index, 1);
      setComments(updatedComments);
    } else {
      alert('You do not have permission to delete this comment.');
    }
  };

  return (
    <div style={{ borderColor: borderColor }}>
      {/* 댓글 목록 */}
      {comments.map((commentData, index) => (
        <CommentContainer key={index}>
          <img
            src={commentData.profileImageUrl}
            alt={`${commentData.nickname}'s profile`}
            width="50"
            height="50"
          />
          <CommentContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong>{commentData.nickname}</strong>
              <span>{timeSince(new Date(commentData.timestamp))}</span>{' '}
              {/* 댓글 작성 시간 표시 */}
              {loggedInUser.userId === commentData.userId && (
                <>
                  <button onClick={() => handleEdit(index)}>수정</button>
                  <button onClick={() => handleDelete(index)}>삭제</button>
                </>
              )}
            </div>
            <p>{commentData.content}</p>
          </CommentContent>
        </CommentContainer>
      ))}
      {/* 댓글 인풋 */}
      <CommentInputContainer>
        <input type="text" value={newComment} onChange={handleCommentChange} />
        {editingIndex === -1 ? (
          <button onClick={handleCommentSubmit}>Submit</button>
        ) : (
          <button onClick={handleSave}>저장</button>
        )}
      </CommentInputContainer>
    </div>
  );
};

export default DetailComments;
