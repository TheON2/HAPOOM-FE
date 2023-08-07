import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SET_UPDATEID, TOGGLE_UPDATE } from '@/redux/reducers/postSlice';
import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import { likePost, reportPost } from '@/api/main/post';

export default function TestMain() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const toggleUpdate = useCallback(() => dispatch(TOGGLE_UPDATE()), [dispatch]);
  const updateId = useCallback(
    (id: string) => dispatch(SET_UPDATEID(id)),
    [dispatch]
  );

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUpdateClick = () => {
    updateId(inputValue);
    setInputValue('');
  };

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  };

  const { mutate: likeMutation, isLoading: likeLoading } = useMutation(
    likePost,
    mutationOptions
  );

  const { mutate: reportMutation, isLoading: reportLoading } = useMutation(
    reportPost,
    mutationOptions
  );

  const likeClick = (postId: string) => {
    console.log(postId);
    likeMutation(postId);
  };

  const ReportClick = (postId: string) => {
    console.log(postId);
    reportMutation(postId);
  };

  return (
    <>
      <main>
        <button onClick={toggleUpdate}>업데이트 토글</button>
        <input type="number" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleUpdateClick}>ID 업데이트</button>
        <button onClick={() => likeClick(inputValue)}>LIKE</button>
        <button onClick={() => ReportClick(inputValue)}>REPORT</button>
        <Link href="/post/Write">
          <button>포스트 작성 페이지로 이동</button>
        </Link>
      </main>
    </>
  );
}
