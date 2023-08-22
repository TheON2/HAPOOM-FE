import { useInfiniteQuery } from 'react-query';
import { getMyPosts, getMyLikedPosts } from '../api/post';

export const useInfiniteData = (type: 'post' | 'like', method: string) => {
  const fetchFunction = async ({ pageParam = 1 }) => {
    if (type === 'post') {
      return await getMyPosts(method, pageParam);
    } else if (type === 'like') {
      return await getMyLikedPosts(method, pageParam);
    }

    throw new Error('Invalid fetchFunction type');
  };

  return useInfiniteQuery([type, method], fetchFunction, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length === 12) {
        return allPages.length + 1;
      }
      return false;
    },
  });
};
